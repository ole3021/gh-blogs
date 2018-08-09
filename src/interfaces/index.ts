export interface IFileInfo {
  folder: string
  file: string
  name: string
  ext: string
  createdAt: Date
  updatedAt: Date
  size: number
  mode: number
}

export interface IBlog {
  id: string
  path: string
  title: string
  createdAt: Date
  updatedAt: Date
  size: number
  meta: IMeta
}

interface IMeta {
  title?: string
  intro?: string
}

export interface IBlogFile {
  title: string
  meta: IMeta
}