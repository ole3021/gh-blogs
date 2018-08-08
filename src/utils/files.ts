'use strict'

import * as fs from 'fs'
import * as path from 'path'

export const getRootPath = (): string =>
  path.join(path.resolve(__dirname), '../..')
export const getStats = (pathLike: fs.PathLike): fs.Stats =>
  fs.statSync(pathLike)
export const checkIsExist = (pathLike: fs.PathLike): Boolean =>
  fs.existsSync(pathLike)
export const checkIsDirectory = (pathLike: fs.PathLike): Boolean =>
  fs.lstatSync(pathLike).isDirectory()

export interface IFileInfo {
  folder: String
  file: String
  name: String
  ext: String
  createdAt: Date
  updatedAt: Date
  size: Number
  mode: Number
}

export const getDirFileInfo = (
  pathLike: fs.PathLike,
  root: fs.PathLike = pathLike
): IFileInfo[] | string[] => {
  return fs.readdirSync(pathLike).reduce((allItems: any[] /* TOFIX: Add Type */, name: string) => {
    const itemPath = path.join(pathLike as string, name)
    if (checkIsDirectory(itemPath)) {
      return allItems.concat(getDirFileInfo(itemPath, root) as string[])
    }

    const parsedPath = path.parse(itemPath.replace(root as string, ''))
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
    return allItems.concat([info])
  }, [])
}
