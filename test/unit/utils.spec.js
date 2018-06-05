const path = require('path');
const { loadBlogs, generateMetaInfo } = require('../../lib/utils');

const blogFolderPath = path.join(process.cwd(), './test/fixture/blogs');
let blogsInfo = null;
test('load blogs can generate the folder info', () => {
  blogsInfo = loadBlogs(blogFolderPath);

  expect(blogsInfo.length).toEqual(3);
  expect(blogsInfo[1].dir).toEqual('/javascript');
  expect(blogsInfo[1].name).toEqual('micro service with node.js');
});

test('generate blog infos', () => {
  const result = generateMetaInfo(blogsInfo, blogFolderPath);

  expect(result.length).toEqual(3);
  expect(result[0].meta.author).toEqual('Oliver.W');
  expect(result[1].meta.author).toEqual('Oliver.W');
  expect(result[2].meta.author).toEqual('Oliver.W');
});
