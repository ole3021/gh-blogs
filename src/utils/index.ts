'use strict'

import * as sh from 'shorthash'

export {
  getRootPath,
  getStats,
  checkIsExist,
  checkIsDirectory,
  saveToFile,
  deleteFile,
  getDirFileInfo,
  IFileInfo
} from './files'

export const checkInBrowser = (): boolean => typeof window === 'object'
export const hashString = (str: string): string => sh.unique(str)
