'use strict'

import * as sh from 'shorthash'

export {
  getRootPath,
  getStats,
  checkIsExist,
  checkIsDirectory,
  saveToFile,
  deleteFile,
  getAllDirs,
  getAllFiles
} from './files'

export const checkInBrowser = (): boolean => typeof window === 'object'
export const hashString = (str: string): string => sh.unique(str)
