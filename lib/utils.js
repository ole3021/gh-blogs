const debug = require('debug')('GHBlogs:utils');
const fs = require('fs');
const path = require('path');
const sh = require('shorthash');

const marked = require('marked');
const yamlFront = require('yaml-front-matter');

const { MohError } = require('moh-error');

const ERRORS = require('../constants/errors');

exports.stats = (path) => fs.statSync(path);

exports.generateIndex = (info) => info.map((item) => items);

const isExist = (source) => fs.existsSync(source);
const isDirectory = (source) => fs.lstatSync(source).isDirectory();
const getDirectories = (source, root = source) => {
  return fs.readdirSync(source).reduce((allItems, name) => {
    const itemPath = path.join(source, name);
    if (isDirectory(itemPath))
      return allItems.concat(getDirectories(itemPath, root));

    const info = Object.assign(path.parse(itemPath.replace(root, '')), {
      stats: fs.statSync(itemPath)
    });
    return allItems.concat([info]);
  }, []);
};

exports.loadBlogs = (path) => {
  if (!isExist(path)) throw new MohError(ERRORS.BLOG_FOLDER_NOT_EXIST);
  if (!isDirectory(path)) throw new MohError(ERRORS.BLOG_PATH_IS_NOT_FOLDER);

  const blogFolder = getDirectories(path);
  return blogFolder;
};

const loadYamlInfo = (path) => {
  const meta = yamlFront.loadFront(fs.readFileSync(path));
  const content = marked(meta.__content);

  delete meta.__content;
  return { meta, content };
};

const name2Id = (name) => {
  const result = name.replace(/[\W_]+/g, '-');
  if (name.length != result.length) return sh.unique(name); // Non alphaBet name will convert to short hashId
  return result;
};

exports.generateIndex = (info, blogPath) =>
  info.map((item) => ({
    _id: name2Id(item.name),
    name: item.name,
    category: item.dir.split('/').filter((item) => item.length > 0),
    createdAt: item.stats.birthtime,
    updateAt: item.stats.mtime,
    size: item.stats.size,
    ...loadYamlInfo(path.join(blogPath, item.dir, item.base))
  }));
