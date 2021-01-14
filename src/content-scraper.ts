import { join } from 'path'
import { IContentDocument } from '@nuxt/content'
import { GenerateRequest, ModuleOptions } from './types'

function scrapeField (value: string): Boolean {
  return (
    typeof value === 'string' &&
    !value.includes('://') &&
    !value.match(/\.(png|jpg)$/i)
  )
}

function generateSavePath (document: IContentDocument, field: string, options, nuxtOptions): string {
  return join(nuxtOptions.buildDir, 'dist/client', options.publicPath, `${document.path}-${field}.jpg`)
}

function generatePublicPath (document: IContentDocument, field: string, options, nuxtOptions): string {
  return join(nuxtOptions.build.publicPath, options.publicPath, `${document.path}-${field}.jpg`)
}

function generateRequest (document: IContentDocument, field: string, options, nuxtOptions): GenerateRequest {
  return {
    docPath: document.path,
    savePath: generateSavePath(document, field, options, nuxtOptions),

    field,
    fieldValue: document[field]
  }
}

export function scrapeContent (document: IContentDocument, options: ModuleOptions, nuxtOptions): Array<GenerateRequest> {
  const requests = []

  for (const field of options.fields) {
    if (scrapeField(document[field])) {
      requests.push(generateRequest(document, field, options, nuxtOptions))
      document[field] = generatePublicPath(document, field, options, nuxtOptions)
    }
  }

  return requests
}
