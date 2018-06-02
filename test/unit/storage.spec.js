const fs = require('fs');
const path = require('path');
const { loadBlogs, generateIndex } = require('../../lib/utils');
const BlogDB = require('../../lib/storage');

const blogPath = path.join(__dirname, '../fixture/blogs');
const dbPath = path.join(__dirname, '../fixture/db/testDB.db');

let blogIndex = null;
let blogDB = null;

beforeAll(async () => {
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  const blogFolder = loadBlogs(blogPath);
  blogIndex = generateIndex(blogFolder, blogPath);
  blogDB = new BlogDB(dbPath);
  await blogDB.loadFile();
});

afterAll(() => {
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
});

test('storage can save docs', () => {
  const result = blogDB.updateIndex(blogIndex);

  expect(result.length).toEqual(3);
  expect(result[0]._id).toEqual(blogIndex[0]._id);
  expect(result[1]._id).toEqual(blogIndex[1]._id);
  expect(result[2]._id).toEqual(blogIndex[2]._id);
});

test('storage can get all docs', () => {
  const result = blogDB.getAll();

  expect(result.length).toEqual(3);
  expect(result[0]._id).toEqual(blogIndex[0]._id);
  expect(result[1]._id).toEqual(blogIndex[1]._id);
  expect(result[2]._id).toEqual(blogIndex[2]._id);
});

test('storage can find one item by id', () => {
  const result = blogDB.getBlogById(blogIndex[1]._id);

  expect(result.length).toEqual(1);
  expect(result[0]).toEqual(blogIndex[1]);
});

test('storage can get all collects', () => {
  const result = blogDB.getCollections();

  expect(result[0].name).toEqual('blogs');
  expect(result[0].count).toEqual(3);
});

test('storage can save to file', async () => {
  const beforeState = fs.existsSync(dbPath);
  await blogDB.dumpFile();
  const laterState = fs.existsSync(dbPath);

  expect(beforeState).toBe(false);
  expect(laterState).toBe(true);
});

test('storage can load from file', async () => {
  const blogDB2 = new BlogDB(path.join(__dirname, '../fixture/db/test.json'));

  await blogDB2.loadFile();
  const blogs = blogDB.getAll();

  expect(blogs.length).toEqual(3);
  expect(blogs[0]._id).toEqual(blogIndex[0]._id);
  expect(blogs[1]._id).toEqual(blogIndex[1]._id);
  expect(blogs[2]._id).toEqual(blogIndex[2]._id);
});
