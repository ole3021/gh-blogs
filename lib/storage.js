const fs = require('fs');
const path = require('path');
const PouchDB = require('pouchdb');
const replicationStream = require('pouchdb-replication-stream');

PouchDB.plugin(replicationStream.plugin);
PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);

const BLOGS = 'blogs';
const CONTENTS = 'contents';
const currentPath = process.cwd();

module.exports = class Storage {
  constructor(filePath) {
    this.filePath = filePath;
    this.db = new PouchDB(this.filePath, {
      revs_limit: 1
    }); //new LokiDB(this.filePath);
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

  async updateMeta(metaInfo) {
    for (const info of metaInfo) {
      console.log('>>> ii', info);
      // const doc = {};
      const doc = await this.db.get(info._id);
      console.log('>>> ins', doc);
      const data = await this.db.put(
        doc._rev ? Object.assign(info, { _rev: doc._rev }) : info
      );
      console.log('>>> result', data);
    }
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

  dumpFile() {
    if (!fs.existsSync(path.join(currentPath, './blogs.test'))) {
      console.log('>>> file not x');
      fs.writeFileSync(path.join(currentPath, './blogs.test'), null, {
        flag: 'wx'
      });
    }

    return this.db
      .dump(fs.createWriteStream(path.join(currentPath, './blogs.test')))
      .then((res) => {
        console.log('>> r,', res);
      });
    // return new Promise((resolve, reject) => {
    //   this.db.saveDatabase((err) => {
    //     if (err) reject(err);
    //     resolve();
    //   });
    // });
  }

  close() {
    this.db.close();
  }
};
