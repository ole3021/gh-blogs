'use strict'

import * as path from 'path'
import Storage from './storage'
import Blog, { IBlog } from './blog'
import { getRootPath, getDirFileInfo, IFileInfo } from './utils'

interface IGHBlogModule {
  init(): void
}

export default class GHBlog {
  constructor(private storage: Storage = new Storage()) {}

  init(): void {
    let blogInfo: IBlog[] = []
    const rootPath = getRootPath()
    const targetPath = path.join(rootPath, '..')
    const fileInfo = getDirFileInfo(targetPath) as IFileInfo[]

    for (const info of fileInfo) {
      blogInfo.push(new Blog(info))
    }

    this.storage.build(blogInfo)
  }
}
