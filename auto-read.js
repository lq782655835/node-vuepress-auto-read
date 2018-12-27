const fs = require('fs')
const { join } = require('path')
const chalk = require('chalk')

let getConfigByDir = ({folderTitleMap={}}) => {
    let getSideBar = findSync('./docs', folderTitleMap)
    // order array
    let resultOrderSideBar = []
    Object.keys(folderTitleMap).forEach(key =>
        resultOrderSideBar.push(getSideBar.find(item => item.key === key))
    )
    return resultOrderSideBar
}

let findSync = (startPath, titleMap) => {
    let result = []
    function finder(path) {
        let files = fs.readdirSync(path)
        for (val of files) {
            let fPath = join(path, val)
            let stats = fs.statSync(fPath)

            let includeDirTitle = titleMap[val]
            let isValidDir = stats.isDirectory() && includeDirTitle
            let isValidFile = stats.isFile() && val.endsWith('.md')

            if (isValidDir) {
                result.push({
                    key: val,
                    title: includeDirTitle,
                    collapsable: true,
                    children: []
                })
                finder(fPath)
            }

            if (isValidFile) {
                let pathArray = fPath.split('/')
                let key = pathArray.slice(-2, -1).join('')
                let item = result.find(item => item.key === key)
                item && item.children.push(pathArray.slice(-2).join('/'))
            }
        }
    }
    finder(startPath)
    return result
}

module.exports = function(options) {
    let { destpath } = options
    let jsPrefix = 'module.exports = '
    fs.readFile(destpath, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        // override sidebar
        let jsonStr = data.replace('module.exports = ', '')
        let jsonData = eval(`(${jsonStr})`)
        jsonData.themeConfig.sidebar = getConfigByDir(options)
        let overrideStr = jsPrefix + JSON.stringify(jsonData)

        fs.writeFile(destpath, overrideStr, 'utf8', (err, data) => {
            if (err){
                return console.log(chalk.red(err))
            }

            console.log(chalk.green('succeed'))
        })
    })
}