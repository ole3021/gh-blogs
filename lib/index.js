let host = null;
const { MohError } = require('moh-error');
const { loadBlogs, generateIndex } = require('./utils');
const Storage = require('./storage');

const ERRORS = require('../constants/errors');

module.exports = class GHBlogs {
  constructor(host, folderPath, indexFile) {
    if (!host || !folderPath)
      throw new MohError(ERRORS.MISSING_HOST_OR_BLOG_PATH);
    this.host = host;
    this.folderPath = folderPath;
    this.indexFile = indexFile;
    this.storage = new Storage(indexFile);
  }

  async init() {
    await this.storage.loadFile();
  }

  async generateIndex() {
    const blogInfos = loadBlogs(this.folderPath);
    const blogIndexs = generateIndex(blogInfos, this.folderPath);
    this.storage.updateIndex(blogIndexs);
    await this.storage.dumpFile();
  }

  loadJSON(json) {
    this.storage.loadJSON(json);
  }

  fetchAll() {
    return this.storage.getAll();
  }

  fetchBlog(id) {
    return this.storage.findBlogById(id);
  }
};
