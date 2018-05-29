const fs = require("fs");

exports.stats = path => fs.statSync(path);

exports.name2Id = name => name.replace(" ", "-");

exports.generateIndex = info => info.map(item => items);
