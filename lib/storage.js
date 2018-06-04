const LokiDB = require('lokijs');

const BLOGS = 'blogs';
const CONTENTS = 'contents';

module.exports = class Storage {
  constructor(filePath) {
    this.filePath = filePath;
    this.db = new LokiDB(this.filePath);
    this.blogCollect = null;
    this.contentCollect = null;
  }

  loadJSON(JSON) {
    this.db.loadJSONObject(JSON);
    this.initialize();
  }

  loadFile() {
    return new Promise((resolve, reject) => {
      this.db.loadDatabase({}, (err) => {
        if (err) reject(err);
        this.initialize();
        resolve();
      });
    });
  }

  initialize() {
    this.blogCollect = this.db.getCollection(BLOGS);
    this.contentCollect = this.db.getCollection(CONTENTS);
  }

  updateMeta(metaInfo) {
    // clean collection
    if (this.blogCollect) this.db.removeCollection(BLOGS);
    if (this.contentCollect) this.db.removeCollection(CONTENTS);
    this.blogCollect = this.db.addCollection(BLOGS);

    metaInfo.map((item) => this.blogCollect.insert(item));

    return this.blogCollect.data;
  }

  get(id) {
    // Check content
    // Fetch blog
    // Save to content
    return this.blogCollect.find({
      _id: id
    });
  }

  getAll() {
    return this.blogCollect.data;
  }

  getCollections() {
    return this.db.listCollections();
  }

  dumpFile(cb) {
    return new Promise((resolve, reject) => {
      this.db.saveDatabase((err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  close() {
    this.db.close();
  }
};
