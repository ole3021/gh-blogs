'use strict'

import { IFileInfo, IBlog, IBlogFile } from './interfaces'
import * as fs from 'fs'
import * as path from 'path'
import * as yamlFront from 'yaml-front-matter'
import { getRootPath, hashString } from './utils'

interface IBlogModule {
  loadBlogFile(blogPath: string): IBlogFile
  name2Id(): string
}

export default class Blog implements IBlogModule {
  public readonly id: string
  public readonly path: string
  public readonly title: string
  public readonly createdAt: Date
  public readonly updatedAt: Date
  public readonly size: number
  public readonly meta: object

  constructor(fileInfo: IFileInfo) {
    const rootPath = getRootPath()

    this.path = path.join(fileInfo.folder, fileInfo.file)
    this.createdAt = fileInfo.createdAt
    this.updatedAt = fileInfo.updatedAt
    this.size = fileInfo.size
    const blogFile: IBlogFile = this.loadBlogFile(
      path.join(rootPath, 'test', 'fixture', this.path)
    )
    this.title = blogFile.title || fileInfo.name
    this.meta = blogFile.meta
    this.id = this.name2Id()
  }

  loadBlogFile(blogPath: string): IBlogFile {
    const meta = yamlFront.loadFront(fs.readFileSync(blogPath as fs.PathLike))

    delete meta.__content
    return {
      title: meta.title,
      meta
    }
  }

  name2Id(): string {
    return hashString(`${this.path}`)
  }
}
