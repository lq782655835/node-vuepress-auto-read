#!/usr/bin/env node

const chalk = require('chalk')
const fs = require('fs-extra')
const yargs = require('yargs')
const auto = require('./src/auto-read')

const args = yargs
.usage('Usage: $0 --config=config --rootPath=rootPath')
.describe('config', "config file path")
.default('config', './package.json')
.describe('rootPath', "vuepress dest docs path")
.default('rootPath', './docs')
.describe('blogUrl', 'your blog base url')
.describe('markdown', 'your blog readme path')
.default('markdown', './README.md')
.help('help')
.alias('h', 'help').argv

// auto run
;(async function() {
    try {
        let config = await fs.readJson(args.config)
        await auto({...args, ...config})
    } catch (err) {
        console.log(chalk.red(err))
    }
})()