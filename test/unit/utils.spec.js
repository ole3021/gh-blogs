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

  expect(result.length).toEqual(3);
  expect(result[0].meta.author).toEqual('Oliver.W');
  expect(result[1].meta.author).toEqual('Oliver.W');
  expect(result[2].meta.author).toEqual('Oliver.W');
  expect(result[0].content).toBeDefined();
  expect(result[1].content).toBeDefined();
  expect(result[2].content).toBeDefined();
});
