import type { RequestClientOptions } from '@Socratic11/companion-client'
import type {
  IndexedObject,
  PluginTarget,
  UIPlugin,
  UIPluginOptions,
} from '@Socratic11/core'
import UrlLocale from './generatedLocale'

export interface UrlOptions extends UIPluginOptions, RequestClientOptions {
  target?: PluginTarget
  title?: string
  locale?: UrlLocale
}

declare class Url extends UIPlugin<UrlOptions> {
  public addFile(
    url: string,
    meta?: IndexedObject<any>,
  ): undefined | string | never
}

export default Url
