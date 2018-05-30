const path = require('path');
const { loadBlogs, generateIndex } = require('../../lib/utils');

const blogPath = path.join(__dirname, '../fixture/blogs');
let blogFolder = null;
test('load blogs can generate the folder info', () => {
  blogFolder = loadBlogs(blogPath);

  expect(blogFolder.length).toEqual(3);
  expect(blogFolder[1].dir).toEqual('/javascript');
  expect(blogFolder[1].name).toEqual('micro service with node.js');
});

test('generate blog infos', () => {
  const result = generateIndex(blogFolder, blogPath);
  console.log('>>> result', result);
});
