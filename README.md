# Github Blogs

The lib to simulate manage blogs through Github repo with file DB easily.

## Motivation

- Github is Free to build Github Pages
- Yaml favoured Markdown is useful to add meta data in markdown posts
  - Save title, intro, cover image and etc in the meta info file
  - Load all blog meta at one time easily.
- Load blog post separately, and no need to update or generate anything when updating posts
- Use independent repo as blogs repo and load them from outside. SRP(Single Responsibility Principle) and keep them clean.
- Use browser memory to catch posts on browser(Make it fast to load when second time read a same post)
- Use issues for posts as comments
- Comfortable to working with Github flows
- Good experience with modify files in the Github Editor (available to update contents in github directly)

## TODO

- CMS to CURD posts.

## Features

- [x] Meta file used to save meta info
- [x] DB like to operation posts
- [x] Auto generate id for posts based on the title

### TODO:

- [ ] Able to search within browser for title and content
- [ ] Add exceptions folders
- [ ] Add load method with process event info
- [ ] Auto build blog index with CI/CD
- [ ] Use repo issues to save and manage comments

## Usage

### Use Locally[First Step]

Generate the blogs meta info on the Github YAML favoured Markedown file, and save it to a file for later to use. It it not needed when later update the content in Github.

> Blogs should be nested in any level under the blog folder, all the nested will be take as the categories of the blogs automatically.

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

### Load from remote[Second Step]

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

- File create date and last modified data will be use as `createdAt` and `updateAt` in the meta info
- Use yaml info in header to save any other meta info you like, eg `title`, `intro`, `cover`, `themeColor` and etc.
- English file will have id whith the file name which will be replaced all non alphabet char will be replace by '\_'
- Non-English file will have a short hash id generate as the id(like `Zldfjz`) in the meta info.
- When get blog with id, the lib will fetch the blog remotely and then catch it in memory.
