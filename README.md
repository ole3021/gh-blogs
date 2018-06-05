# Github Blogs

The lib to symulate manage blogs through Github repo with fildDB easily.

## Motivation

* Github is Free to build Github Pages
* Yaml favoured Markdown
* Comfort to working with Github flows
* Good experience with modify files in the Github Editor

## Features

* [x] Use independent repo as blogs, SRP(Single Responsibility Principle)
* [x] Use file DB to simulate oprations with blogs instead files.

  * Load all blog meta info
  * Load a blog by ID and catch for next time view on site
  * Able to search within browser

* [x] Easy to generate blog index

### TODO:

* [ ] Add exceptions folders
* [ ] Add load process event info
* [ ] Auto build blog index with CI/CD
* [ ] Use repo issues to save and manage comments

## Usage

### Use Locally

Generate the blogs index based on the Github YAML favoured Markedown file, and save it to a file for later to use. It it not need when later update the content in Github.

> Blogs should be nested in any level under the blog folder, all the nested will be take as the categories of the blogs.

1.  create a script [`build.js`](https://github.com/ole3021/blogs/blob/master/build.js) at the root fo the repo folder as the script to do the work.

```js
// build.js
const GHBlog = require('gh-blogs');

const blogRepo = 'https://github.com/ole3021/blogs';
const options = {
  folder: './blogs', // path for the blogs folder
  dbFile: './blogs.db' // file path for the db file
};

const myBlogs = new GHBlog(blogRepo, options);

const dumpFile = async () => {
  try {
    await myBlogs.dumpFile();
    console.log('>>> Generate successfully.');
  } catch (error) {
    console.log('>>> Faild to generate index', error);
  }
};

dumpFile();
```

2.  add all the files and commit to the master branch of the repo.

### Load from remote

Use this lib as a DB in memoyr with load the generate file.

```js
const GHBlogs = require('gh-blogs');

const blogRepo = 'https://github.com/ole3021/blogs';
const options = {
  folder: './blogs', // path for the blogs folder
  dbFile: './blogs.db' // path for the db file
};

const myBlogs = new GHBlogs(blogRepo, options);
const init = async () => {
  await myBlogs.loadRemote(); // will load data from the repo remotely

  const allBlogMetaInfo = myBlogs.getAll();
  const aBlog = myBlogs.get('The _id in the meta info');
};
```

### Details

* File create date and last modified data will be use as `createdAt` and `updateAt` in the meta info
* Use yaml info in header to save any other meta info you like, eg `title`, `intro`, `cover`, `themeColor` and etc.
* English file will have id whith the file name which will be replaced all non alphabet char will be replace by '\_'
* Non-English file will have a short hash id generate as the id(like `Zldfjz`) in the meta info.
* When get blog with id, the lib will fetch the blog remotely and then catch it in memory.
