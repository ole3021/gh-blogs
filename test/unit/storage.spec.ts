'use strict'

import * as path from 'path'
import { getRootPath, checkIsExist, deleteFile } from '../../src/utils'
import Storage from '../../src/storage'

describe('Storage Module', () => {
  it('should can save info to file', () => {
    const rootPath = getRootPath()
    const storagePath = path.join(rootPath, '.GHBlogs')
    deleteFile(storagePath)
    const isPreExist = checkIsExist(storagePath)
    const storage = new Storage()
    storage.build([
      {
        id: 'test',
        path: '/test',
        title: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        size: 123213,
        meta: {
          info: 'test'
        }
      }
    ])

    const isPosExist = checkIsExist(storagePath)
    expect(isPreExist).toBe(false)
    expect(isPosExist).toBe(true)
    deleteFile(storagePath)
  })
})
