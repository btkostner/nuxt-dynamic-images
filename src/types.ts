export interface ModuleOptions {
  fields: Array<string>,
  elSelector: string,

  publicPath: string,

  puppeteerOptions?: any
}

export interface GenerateRequest {
  docPath: string,
  savePath: string,

  field: string,
  fieldValue: string
}
