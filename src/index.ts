'use strict'

import * as path from 'path'
import Storage from './storage'
import { buildBlogInfo } from './blog'
import { getRootPath, getDirFileInfo, } from './utils'
import { IFileInfo, IBlog } from './interfaces'

// export default class GHBlog implements {
//   constructor(private storage: Storage = new Storage()) { }

// init(): void {
//   let blogInfo: IBlog[] = []
//     const rootPath = getRootPath()
//     const targetPath = path.join(rootPath, '..')
//     const fileInfo = getDirFileInfo(targetPath) as IFileInfo[]

//     for(const info of fileInfo) {
//     blogInfo.push(new Blog(info))
//   }

//     this.storage.build(blogInfo)
// }
// }


export default function (excludeFolders: string[]): void {
  const rootPath = getRootPath()
  const targetPath = path.join(rootPath, '..')
  const fileInfo: IFileInfo[] = getDirFileInfo(targetPath, excludeFolders)

  const blogInfo: IBlog[] = buildBlogInfo(fileInfo)

    .storage.build(blogInfo)
}