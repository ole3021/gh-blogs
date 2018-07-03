const path = require('path');
const axios = require('axios');
const { MohError } = require('moh-error');
const { loadBlogs, generateMetaInfo, getRepoInfo } = require('./utils');
const Storage = require('./storage');
const currentPath = process.cwd();

const ERRORS = require('../constants/errors');

module.exports = class GHBlogs {
  constructor(repo, options) {
    if (!repo) throw new MohError(ERRORS.MISSING_REPO);
    const { folder, dbFile } = options;
    if (!options || !folder || !dbFile)
      throw new MohError(ERRORS.MISSING_OPTIONS);

    this.repo = repo;
    this.folder = folder;
    this.dbFile = dbFile;
    this.storage = new Storage(this.dbFile);
    this.ax = axios.create({
      baseURL: this.repo,
      timeout: 10000,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  async dumpFile() {
    const blogInfos = loadBlogs(path.join(currentPath, this.folder));
    const metaInfo = generateMetaInfo(
      blogInfos,
      path.join(currentPath, this.folder)
    );
    await this.storage.updateMeta(metaInfo);
    await this.storage.dumpFile();
  }

  async loadFile() {
    await this.storage.loadFile();
  }

  async loadRemote() {
    const rawDBPath = path.join(
      'https://raw.githubusercontent.com',
      getRepoInfo(this.repo).path,
      'master',
      this.dbFile
    );
    const { data: dbJSON } = await axios({
      method: 'GET',
      url: rawDBPath,
      responseType: 'stream'
    });

    this.storage.loadJSON(dbJSON);
  }

  getAll() {
    return this.storage.getAll();
  }

  get(id) {
    return this.storage.get(id);
  }
};
