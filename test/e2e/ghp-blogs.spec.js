const path = require('path');
const fs = require('fs');
const GHBlogs = require('../../');

describe('GHBlogs', () => {
  const folderPath = path.join(__dirname, '../fixture/blogs');
  const dbPath = path.join(__dirname, '../fixture/db/blog.db');
  const testPath = path.join(__dirname, '../fixture/db/test.db');

  const myBlogs = new GHBlogs('ole3021.me', folderPath, dbPath);

  beforeAll(() => {
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  });

  afterAll(() => {
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  });

  it('should can create instance with correct props', () => {
    expect(myBlogs.repo).toEqual('ole3021.me');
    expect(myBlogs.folderPath).toEqual(folderPath);
    expect(myBlogs.indexFile).toEqual(dbPath);
  });

  it('should throw error when missing required field', () => {
    try {
      const myBlogs = new GHBlogs();
    } catch (error) {
      expect(error.message).toEqual('The host or the blogPath are quired.');
    }
  });

  it('should generate index for lbogs', async () => {
    const beforeState = fs.existsSync(dbPath);

    await myBlogs.generateIndex();
    const laterState = fs.existsSync(dbPath);
    expect(beforeState).toBe(false);
    expect(laterState).toBe(true);
  });

  it('should generate index for lbogs', async () => {
    const content = JSON.parse(fs.readFileSync(testPath));
    const myBlog = new GHBlogs('ole3021.me', folderPath);

    myBlog.loadJSON(content);
    const blogs = myBlog.fetchAll();

    expect(blogs.length).toEqual(3);
    expect(blogs[0]._id).toEqual('about');
    expect(blogs[1]._id).toEqual('micro-service-with-node-js');
    expect(blogs[2]._id).toEqual('Zldfjz');
  });
});
