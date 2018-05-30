const GHBlogs = require('../../');

describe('GHBlogs', () => {
  it('should can create instance with correct props', () => {
    const myBlogs = new GHBlogs(
      'ole3021.me',
      './fixture/blogs',
      './fixture/blogIndex.db'
    );

    expect(myBlogs.host).toEqual('ole3021.me');
    expect(myBlogs.folderPath).toEqual('./fixture/blogs');
    expect(myBlogs.indexFile).toEqual('./fixture/blogIndex.db');
  });

  it('should throw error when missing required field', () => {
    try {
      const myBlogs = new GHBlogs();
    } catch (error) {
      expect(error.message).toEqual('The host or the blogPath are quired.');
    }
  });
});
