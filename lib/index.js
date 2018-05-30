let host = null;
const { MohError } = require('moh-error');
const { loadBlogs } = require('./utils');

const ERRORS = require('../constants/errors');

// [
//   {
//     title: "Scope & Closure",
//     intor:
//       'Summary of JavaScript Scope and Closure knowledge based on "You Don\'t Know JS" series books.',
//     category: "[JavaScript, Type]",
//     tags: "[Don't Know JS]",
//     cover: "/assets/images/post/scope_closure.png",
//     color: "#606060",
//     created: "2016-03-13",
//     modified: "2016-03-13"
//   }
// ];
module.exports = class GHBlogs {
  constructor(host, folderPath, indexFile = './blogIndex.db') {
    if (!host || !folderPath)
      throw new MohError(ERRORS.MISSING_HOST_OR_BLOG_PATH);
    this.host = host;
    this.folderPath = folderPath;
    this.indexFile = indexFile;
  }

  generateIndex() {
    // Load exist indexs
    // Load blogPath files
    const blogInfos = loadBlogs(this.folderPath);
    // const indexInfo =
    // Check stats of each
    // Update the one has updated or all
    // dump to file
  }

  loadIndex() {
    // try to fetch file
    // return the index datas for blogs
  }

  fetchBlog(id) {
    // if catched in db, return the blog
    // else request the original file
    // catch to db
    // return the blog
  }
};
