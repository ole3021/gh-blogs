const path = require('path');
const fs = require('fs');
const GHBlogs = require('../../');

describe('GHBlogs', () => {
  const folderPath = './test/fixture/blogs';
  const dbPath = './test/fixture/db/blog.db';
  const testPath = './test/fixture/db/test.db';
  const repo = 'https://github.com/ole3021/blogs';

  const myBlogs = new GHBlogs(repo, {
    folder: folderPath,
    dbFile: dbPath
  });

  beforeAll(() => {
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  });

  afterAll(() => {
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  });

  it('should can create instance with correct props', () => {
    expect(myBlogs.repo).toEqual(repo);
    expect(myBlogs.folder).toEqual(folderPath);
    expect(myBlogs.dbFile).toEqual(dbPath);
  });

  it('should throw error when missing required field', () => {
    try {
      const myBlogs = new GHBlogs();
    } catch (error) {
      expect(error.message).toEqual('Missint repo info to init.');
    }
  });

  it('should generate db dump file', async () => {
    const beforeState = fs.existsSync(dbPath);

    await myBlogs.dumpFile();
    const laterState = fs.existsSync(dbPath);
    expect(beforeState).toBe(false);
    expect(laterState).toBe(true);
  });

  it('should generate index for lbogs', async () => {
    const content = JSON.parse(fs.readFileSync(testPath));
    const anotherBlogs = new GHBlogs('https://github.com/ole3021/ghp-blogs', {
      folder: folderPath,
      dbFile: './test/fixture/db/test.db'
    });

    await anotherBlogs.loadRemote();
    const blogs = anotherBlogs.getAll();

    expect(blogs.length).toEqual(3);
    expect(blogs[0]._id).toEqual('about');
    expect(blogs[1]._id).toEqual('micro-service-with-node-js');
    expect(blogs[2]._id).toEqual('Zldfjz');
  });
});
