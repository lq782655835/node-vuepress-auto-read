# node-vuepress-auto-read

auto read vuepress and setting sidebar config by folder structure

## Installl
``` bash
npm install node-vuepress-auto-read --save-dev
```

## Usage
1. config you sidebar mapping in package.json file
``` json
"folderTitleMap": {
    "folder1": "团队规范"
}
```

2. auto run for override sidebar of vuepress config.js
``` bash
vuepress-auto-read
```

```
Usage: index.js --config=config --destpath=destpath

Options:
  --version   Show version number                                      [boolean]
  --config    config file path           [default: "./package.json"]
  --destpath  vuepress dest config       [default: "./docs/.vuepress/config.js"]
  -h, --help  Show help                                                [boolean]
```