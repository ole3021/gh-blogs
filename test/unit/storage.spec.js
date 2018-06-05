const fs = require('fs');
const path = require('path');
const { loadBlogs, generateMetaInfo } = require('../../lib/utils');
const Storage = require('../../lib/storage');

const blogPath = path.join(process.cwd(), './test/fixture/blogs');
const testPath = path.join(process.cwd(), './test/fixture/db/test.db');
const dbPath = path.join(process.cwd(), './test/fixture/db/testDB.db');

let blogIndex = null;
let blogStorage = null;

beforeAll(async () => {
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  const blogsInfo = loadBlogs(blogPath);
  blogIndex = generateMetaInfo(blogsInfo, blogPath);

  blogStorage = new Storage(dbPath, { folder: blogPath, dbFile: dbPath });
  await blogStorage.loadFile();
});

afterAll(() => {
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
});

test('storage can save docs', () => {
  const result = blogStorage.updateMeta(blogIndex);

  expect(result.length).toEqual(3);
  expect(result[0]._id).toEqual(blogIndex[0]._id);
  expect(result[1]._id).toEqual(blogIndex[1]._id);
  expect(result[2]._id).toEqual(blogIndex[2]._id);
});

test('storage can get all docs', () => {
  const result = blogStorage.getAll();

  expect(result.length).toEqual(3);
  expect(result[0]._id).toEqual(blogIndex[0]._id);
  expect(result[1]._id).toEqual(blogIndex[1]._id);
  expect(result[2]._id).toEqual(blogIndex[2]._id);
});

test('storage can find one item by id', () => {
  const result = blogStorage.get(blogIndex[1]._id);

  expect(result.length).toEqual(1);
  expect(result[0]).toEqual(blogIndex[1]);
});

test('storage can get all collects', () => {
  const result = blogStorage.getCollections();

  expect(result[0].name).toEqual('blogs');
  expect(result[0].count).toEqual(3);
});

test('storage can save to file', async () => {
  const beforeState = fs.existsSync(dbPath);
  await blogStorage.dumpFile();
  const laterState = fs.existsSync(dbPath);

  expect(beforeState).toBe(false);
  expect(laterState).toBe(true);
});

test('storage can load from file', async () => {
  const blogStorage2 = new Storage(testPath);

  await blogStorage2.loadFile();
  const blogs = blogStorage.getAll();

  expect(blogs.length).toEqual(3);
  expect(blogs[0]._id).toEqual(blogIndex[0]._id);
  expect(blogs[1]._id).toEqual(blogIndex[1]._id);
  expect(blogs[2]._id).toEqual(blogIndex[2]._id);
});

test('storage can load from JSON', () => {
  const content = JSON.parse(fs.readFileSync(testPath));

  const blogStorage3 = new Storage();
  blogStorage3.loadJSON(content);
  const blogs = blogStorage3.getAll();

  expect(blogs.length).toEqual(3);
  expect(blogs[0]._id).toEqual(blogIndex[0]._id);
  expect(blogs[1]._id).toEqual(blogIndex[1]._id);
  expect(blogs[2]._id).toEqual(blogIndex[2]._id);
});
