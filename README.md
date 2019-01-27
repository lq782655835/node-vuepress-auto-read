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

```
Usage: vuepress-auto-read [options]

Options:
  --version       Show version number                                  [boolean]
  -c, --config    config file path                   [default: "./package.json"]
  -r, --rootPath  vuepress dest docs path                    [default: "./docs"]
  -m, --markdown  your blog readme path                 [default: "./README.md"]
  -b, --blogUrl   your blog base url
  -h, --help      Show help                                            [boolean]
```