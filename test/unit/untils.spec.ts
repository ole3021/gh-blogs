import * as path from 'path'
import {
  checkInBrowser,
  getRootPath,
  getStats,
  checkIsExist,
  checkIsDirectory,
  getDirFileInfo,
  saveToFile,
  deleteFile,
  hashString,
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

test('Save content to file', () => {
  const testContent = `aaaa`
  const rootPath = getRootPath()
  const targetPath = path.join(
    rootPath,
    'test',
    'fixture',
    '.ghblogs',
    '.blogIndex'
  )
  deleteFile(targetPath)
  const isPreExist = checkIsExist(targetPath)

  saveToFile(targetPath, testContent)

  const isPosExist = checkIsExist(targetPath)

  expect(isPreExist).toBe(false)
  expect(isPosExist).toBe(true)
  deleteFile(targetPath)
})

test('Get directories info', () => {
  const rootPath = getRootPath()
  const fixturePath = path.join(rootPath, 'test', 'fixture')
  const fileInfo = getDirFileInfo(fixturePath) as IFileInfo[]

  expect(fileInfo.length).toBe(5)

  const aboutInfo = fileInfo.find((info) => info.name === 'about')
  const jsTipInfo = fileInfo.find((info) => info.name === 'js tips')
  expect(aboutInfo.file).toBe('about.md')
  expect(aboutInfo.ext).toBe('.md')
  expect(aboutInfo.name).toBe('about')
  expect(aboutInfo.folder).toBe('/')
  expect(jsTipInfo.file).toBe('js tips.md')
  expect(jsTipInfo.ext).toBe('.md')
  expect(jsTipInfo.name).toBe('js tips')
  expect(jsTipInfo.folder).toBe('/javascript/tips')
})

test('Hash any strings', () => {
  const hashedResult1 = hashString('/Javascript/Async Await.md')
  const hashedResult2 = hashString('/Software Engineering/设计思想.md')
  const hashedResult3 = hashString('/Design/设计&Sketch.md')

  expect(hashedResult1).toBe('21iel2')
  expect(hashedResult2).toBe('zmPMa')
  expect(hashedResult3).toBe('ZIi3Ds')
})
