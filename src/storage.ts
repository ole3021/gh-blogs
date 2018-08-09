'use strict'

import * as path from 'path'
import { saveToFile, getRootPath } from './utils'
import { IBlog } from './blog'

interface IStorageModule {
  build(blogs: IBlog[]): void
}

export default class Storage implements IStorageModule {
  constructor(private fileName: string = '.GHBlogs') {}

  build(blogs: IBlog[]): void {
    const rootPath = getRootPath()
    saveToFile(path.join(rootPath, this.fileName), JSON.stringify(blogs))
  }
}
