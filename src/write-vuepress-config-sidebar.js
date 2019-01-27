module.exports = async (configPath, sidebar) => {
    let vuepressConfig = await fs.readFile(configPath, 'utf-8')

    let jsPrefix = 'module.exports = '
    let jsonStr = vuepressConfig.replace(jsPrefix, '')
    let jsonData = eval(`(${jsonStr})`)
    jsonData.themeConfig.sidebar = sidebar
    let overrideStr = jsPrefix + JSON.stringify(jsonData)

    await fs.outputFile(configPath, overrideStr)
}
