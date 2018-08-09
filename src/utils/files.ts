'use strict'

import * as fs from 'fs'
import * as path from 'path'
import { IFileInfo } from '../interfaces'

export const getRootPath = (): string =>
  path.join(path.resolve(__dirname), '../..')
export const getStats = (pathLike: fs.PathLike): fs.Stats =>
  fs.statSync(pathLike)
export const checkIsExist = (pathLike: fs.PathLike): Boolean =>
  fs.existsSync(pathLike)
export const checkIsDirectory = (pathLike: fs.PathLike): Boolean =>
  fs.lstatSync(pathLike).isDirectory()
export const saveToFile = (pathLike: fs.PathLike, content: string): void => {
  // TODO: If folder not exist create folder.
  fs.writeFileSync(pathLike, content, 'utf8')
}
export const deleteFile = (pathLike: fs.PathLike): void => {
  if (checkIsExist(pathLike)) fs.unlinkSync(pathLike)
}

export const getAllDirs = (folderPath: string, excludeFolders: string[] = [], root: string = folderPath): string[] => {
  return fs.readdirSync(folderPath).reduce((
    allDirs: string[],
    name: string
  ) => {
    const itemPath = path.join(folderPath, name)
    if (checkIsDirectory(itemPath) && !excludeFolders.includes(name)) {
      allDirs = allDirs.concat([itemPath])
      return allDirs.concat(getAllDirs(itemPath, excludeFolders, root))
    }
    return allDirs
  }, [])
}

export const getFiles = (folderPath: string, exts: string[] = []): IFileInfo[] => {
  return fs.readdirSync(folderPath).reduce((
    allInfo: IFileInfo[],
    name: string
  ) => {
    const itemPath = path.join(folderPath, name)

    if (!checkIsDirectory(itemPath) && (exts.length === 0 || exts.includes(name.split('.')[1]))) {
      const parsedPath = path.parse(itemPath.replace(folderPath, ''))
      const stats = fs.statSync(itemPath)

      const info: IFileInfo = {
        folder: path.join(parsedPath.root, parsedPath.dir),
        file: `${parsedPath.name}${parsedPath.ext}`,
        name: parsedPath.name,
        ext: parsedPath.ext,
        createdAt: stats.birthtime,
        updatedAt: stats.mtime,
        size: stats.size,
        mode: stats.mode
      }
      return allInfo.concat([info])
    }
    return allInfo
  }, [])
}

export const getAllFiles = (
  folderPath: string,
  excludeFolders: string[] = [],
  exts: string[] = [],
  root: string = folderPath
): IFileInfo[] => {
  let fileInfo: IFileInfo[] = []
  const folders = [folderPath].concat(getAllDirs(folderPath, excludeFolders, root))
  for (const folder of folders) {
    const basePath = folder.replace(folderPath, '')

    fileInfo = fileInfo.concat(getFiles(folder, exts).map(item => Object.assign(item, { folder: basePath || '/' })))
  }

  return fileInfo
}

