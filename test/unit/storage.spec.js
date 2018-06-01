const path = require('path');
const { loadBlogs, generateIndex } = require('../../lib/utils');
const BlogDB = require('../../lib/storage');

const blogPath = path.join(__dirname, '../fixture/blogs');
const dbPath = path.join(__dirname, '../fixture/db.json');

let blogIndex = null;
let blogDB = null;
beforeAll(() => {
  const blogFolder = loadBlogs(blogPath);
  blogIndex = generateIndex(blogFolder, blogPath);
  blogDB = new BlogDB(dbPath);
});
test('storage can save docs', () => {
  const result = blogDB.updateIndex(blogIndex);

  console.log('>>> result', result);
});
