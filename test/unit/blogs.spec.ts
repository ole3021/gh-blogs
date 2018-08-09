'use strict'

import * as path from 'path'

import { getRootPath, getAllFiles } from '../../src/utils'
import { IBlog } from '../../src//interfaces'

import Blog from '../../src/blog'

describe('Blog Module', () => {
  let testFileInfo
  beforeAll(() => {
    const rootPath = getRootPath()
    const fixturePath = path.join(rootPath, 'test', 'fixture')
    testFileInfo = getAllFiles(fixturePath)
  })

  it('Should can init blog with fileInfo', () => {
    const aboutInfo = testFileInfo.find((info) => info.name === 'about')
    const blog: IBlog = new Blog(aboutInfo)

    expect(blog.title).toBe('关于我')
    expect(blog.path).toBe('/about.md')
    expect(blog.id).toBe('Z22H5nu')
    expect(blog.meta.intro).toBe('我的个人介绍。')
  })
})
