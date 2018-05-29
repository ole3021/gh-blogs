let host = null;

exports.init = (host, blogPath, indexPath) => {
  host = host;
};

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
exports.generateIndexs = () => {
  // Load exist indexs
  // Load blogPath files
  // Check stats of each
  // Update the one has updated or all
  // dump to file
};

exports.loadIndexs = () => {
  // try to fetch file
  // return the index datas for blogs
};

exports.fetchBlog = id => {
  // if catched in db, return the blog
  // else request the original file
  // catch to db
  // return the blog
};
