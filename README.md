# Github Pages Blogs

The lib for build blogs with github pages easily.

## Motivation

* Free Storage
* Yaml favoured Markdown
* Comfort to working with Github flows
* Online Editor
  * easily fix problems
  * easily view
  * easily modify

## Features

* Use repo as blogs
* Use repo as storage for blogs
* Generate blog index and save as file in repo
* Blog content can be modified without re-generate index or re-build
* One command to update index(meta info)
* [ ] save user commends on issues

### Init the lib

Init the lig with info of the blog host `url`, and the `path` of blog folder

* blogs can be nested in type folders, eg`blogFolder/Javascript/xxx.md` (1 level max)
* blogs can be save in the root fo the blog folder

### Generate index for blogs

Generate the index of blogs with meta data, like `title`, `intro`, `cover`, `themeColor` and etc. All this info can be used to show the blog list with out load the content.

### Load index for blogs

Load the index file of blogs index

### Fetch blog

Fetch a specific blog, one blog is loaded and it will be catched, next time there will directly load the blog content form memory.
