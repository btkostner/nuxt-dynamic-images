import { promises as fs } from 'fs'
import { dirname } from 'path'
import { GenerateRequest, ModuleOptions } from './types'
import { logger } from './logger'

async function render (request, nuxt, count = 0) {
  if (count > 2) {
    throw new Error('Exceeded retry count')
  }

  const { html, error, redirected } = await nuxt.renderRoute(request.fieldValue, {
    contentPath: request.docPath,
    contentField: request.field
  })

  if (redirected != null && redirected !== false) {
    return render({ ...request, docPath: redirected.path }, nuxt, ++count)
  } else if (error != null || html == null) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return render(request, nuxt, ++count)
  } else {
    return html
  }
}

export async function generateContent (request: GenerateRequest, browser, options: ModuleOptions, nuxt): void {
  await fs.mkdir(dirname(request.savePath), { recursive: true })

  const html = await render(request, nuxt)

  logger.debug(`Generating ${request.field} for ${request.docPath}`)

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
