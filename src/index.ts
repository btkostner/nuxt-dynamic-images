import { Module } from '@nuxt/types'
import defu from 'defu'
import puppeteer from 'puppeteer'

import { scrapeContent } from './content-scraper'
import { generateContent } from './content-generator'
import { GenerateRequest, ModuleOptions } from './types'
import { logger } from './logger'

const DEFAULT_MODULE_OPTIONS: ModuleOptions = {
  fields: ['twitterImage', 'facebookImage'],
  elSelector: '#image',

  publicPath: '/images',

  puppeteerOptions: {}
}

function dynamicImagesModule (moduleOptions): Module<ModuleOptions> {
  const options = defu<ModuleOptions>(DEFAULT_MODULE_OPTIONS, this.options.dynamicImages, moduleOptions)

  if (options.fields.length < 1) {
    logger.warn('No need to provide fields to scrap and render.')
    return
  }

  let browser = null

  this.nuxt.hook('listen', async () => {
    browser = await puppeteer.launch(options.puppeteerOptions)
  })

  this.nuxt.hook('close', async () => {
    await browser.close()
  })

  let requests: Array<GenerateRequest> = []

  this.nuxt.hook('content:file:beforeInsert', async (doc) => {
    const newRequests = await scrapeContent(doc, options, this.options)
    requests.push(...newRequests)
  })

  const hookName = this.nuxt.options.dev ? 'build:done' : 'listen'

  this.nuxt.hook(hookName, async () => {
    await generate(requests, browser, options, this.nuxt)
    requests = []
  })
}

async function generate (requests, browser, options, nuxt) {
  if (requests.length === 1) {
    logger.info(`Generating ${requests.length} dynamic image`)
  } else if (requests.length > 1) {
    logger.info(`Generating ${requests.length} dynamic images`)
  }

  await Promise.all(requests.map((request) => {
    return generateContent(request, browser, options, nuxt)
  }))
}

;(dynamicImagesModule as any).meta = require('../package.json')

declare module '@nuxt/types' {
  interface NuxtConfig { dynamicImages?: ModuleOptions } // Nuxt 2.14+
  interface Configuration { dynamicImages?: ModuleOptions } // Nuxt 2.9 - 2.13
}

export default dynamicImagesModule
