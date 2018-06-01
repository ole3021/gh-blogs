const LokiDB = require('lokijs');

module.exports = class BlogDB {
  constructor(filePath) {
    this.filePath = filePath;

    this.db = new LokiDB(this.filePath, {
      autoload: true,
      autoloadCallback: databaseInitialize,
      autosave: true,
      autosaveInterval: 4000
    });

    function databaseInitialize() {
      if (!this.db.getCollection('blogs')) {
        this.db.addCollection('blogs');
      }
    }
    // this.blogCollect = this.db.addCollection('blogs');
  }

  updateIndex(blogIndexs) {
    const result = blogIndexs.map((item) => this.blogCollect.insert(item));
    return result;
    // if (blogDB) {
    //   console.log('>>> exist blogDB');
    //   try {
    //     const { ok } = await blogDB.destroy();
    //     console.log('>>> ok', ok);
    //   } catch (error) {
    //     console.log('>>> err', error.message);
    //   }
    //   blogDB = new PouchDB('ghBlogDB');
    // }
    // const result = await blogDB.bulkDocs(blogIndexs);
    // console.log('>>> result ', result);
    // return result;
  }

  dumpFile(path) {}

  loadFile(path) {}
};
