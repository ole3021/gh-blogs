const LokiDB = require('lokijs');

module.exports = class Storage {
  constructor(filePath) {
    this.filePath = filePath;
    this.db = new LokiDB(this.filePath);
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
    this.blogCollect = this.db.getCollection('blogs');
  }

  updateIndex(blogIndexs) {
    // clean collection
    if (this.blogCollect) this.db.removeCollection('blogs');
    this.blogCollect = this.db.addCollection('blogs');

    blogIndexs.map((item) => this.blogCollect.insert(item));

    return this.blogCollect.data;
  }

  getBlogById(id) {
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
