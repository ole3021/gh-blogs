const GHBlog = require('../../lib');

const blogRepo = 'https://github.com/ole3021/blogs';
const options = {
  folder: './blogs', // path for the blogs folder
  dbFile: './blogs.db' // file path for the db file
};

const myBlogs = new GHBlog(blogRepo, options);

const dumpFile = async () => {
  try {
    await myBlogs.dumpFile();
    console.log('>>> Generate successfully.');
  } catch (error) {
    console.log('>>> Failed to dump file', error);
  }
};

dumpFile();
