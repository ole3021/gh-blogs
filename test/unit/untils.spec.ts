import * as path from 'path'
import {
  checkInBrowser,
  getRootPath,
  getStats,
  checkIsExist,
  checkIsDirectory,
  getDirFileInfo,
  IFileInfo
} from '../../src/utils'

test('Check is not browser environment', () => {
  const isInBrowser = checkInBrowser()

  expect(isInBrowser).toBe(false)
})

test('Get root folder path', () => {
  const rootPath = getRootPath()

  expect(rootPath).toMatch(/gh-blogs/)
})

test('Get file or folder status', () => {
  const rootPath = getRootPath()
  const fixturePath = path.join(rootPath, 'test', 'fixture')
  const fixtureStatus = getStats(fixturePath)

  expect(fixturePath).toMatch(/test\/fixture/)
  expect(fixtureStatus.birthtime).toBeTruthy()
})

test('Check if file or folder exist', () => {
  const rootPath = getRootPath()
  const fixturePath = path.join(rootPath, 'test', 'fixture')
  const articlePath = path.join(rootPath, 'test', 'fixture', 'about.md')
  const fixtureExist = checkIsExist(fixturePath)
  const articleExist = checkIsExist(articlePath)

  expect(fixtureExist).toBe(true)
  expect(articleExist).toBe(true)
})

test('Check if folder is dictory', () => {
  const rootPath = getRootPath()
  const fixturePath = path.join(rootPath, 'test', 'fixture')
  const articlePath = path.join(rootPath, 'test', 'fixture', 'about.md')
  const fixtureFolder = checkIsDirectory(fixturePath)
  const articleFolder = checkIsDirectory(articlePath)

  expect(fixtureFolder).toBe(true)
  expect(articleFolder).toBe(false)
})

test('Get directories info', () => {
  const rootPath = getRootPath()
  const fixturePath = path.join(rootPath, 'test', 'fixture')
  const fileInfo = getDirFileInfo(fixturePath) as IFileInfo[]

  expect(fileInfo.length).toBe(4)
  expect(fileInfo[0].file).toBe('about.md')
  expect(fileInfo[0].ext).toBe('.md')
  expect(fileInfo[0].name).toBe('about')
  expect(fileInfo[0].folder).toBe('/')
  expect(fileInfo[2].file).toBe('js tips.md')
  expect(fileInfo[2].ext).toBe('.md')
  expect(fileInfo[2].name).toBe('js tips')
  expect(fileInfo[2].folder).toBe('/javascript/tips')
})
