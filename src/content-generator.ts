import { promises as fs } from 'fs'
import { dirname } from 'path'
import { GenerateRequest, ModuleOptions } from './types'
import { logger } from './logger'

export async function generateContent (request: GenerateRequest, browser, options: ModuleOptions, nuxt): void {
  await fs.mkdir(dirname(request.savePath), { recursive: true })

  const { html, error } = await nuxt.renderRoute(request.fieldValue, {
    contentPath: request.docPath,
    contentField: request.field
  })

  if (error) {
    throw new Error(`${request.docPath} generated "${error.message}"`)
  } else {
    logger.debug(`Generating ${request.field} for ${request.docPath}`)
  }

  const page = await browser.newPage()
  await page.setContent(html)

  const element = await page.$(options.elSelector)

  if (element == null) {
    throw new Error(`${request.fieldValue} unable to find ${options.elSelector}`)
  }

  await element.screenshot({
    path: request.savePath,
    type: 'jpeg'
  })

  await page.close()
}
