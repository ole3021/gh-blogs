'use strict'

export const checkInBrowser = (): Boolean => typeof window === 'object'
export {
  getRootPath,
  getStats,
  checkIsExist,
  checkIsDirectory,
  getDirFileInfo,
  IFileInfo
} from './files'
