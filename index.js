#!/usr/bin/env node

const auto = require('./auto-read')
const chalk = require('chalk')
const fs = require('fs')

const args = require('yargs')
.usage('Usage: $0 --config=config --destpath=destpath')
.describe('config', "config file path")
.default('config', './config.json')
.describe('destpath', "vuepress dest config")
.default('destpath', './docs/.vuepress/config.js')
.help('help')
.alias('h', 'help').argv

let configFilePath = args.config
let config = {}
try {
    let configTxt = fs.readFileSync(configFilePath, 'utf-8')
    config = JSON.parse(configTxt)
} catch {
    console.log(chalk.yellow('you need config folderTitleMap'))
}
// auto run
;(function() {
    try {
        auto({...args, ...config})
    } catch (err) {
        console.log(chalk.red(err))
    }
})()