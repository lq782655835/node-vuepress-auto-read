#!/usr/bin/env node

const chalk = require('chalk')
const fs = require('fs-extra')
const yargs = require('yargs')
const auto = require('./src/auto-read')

const args = yargs
.usage('Usage: $0 [options]')
.describe('c', "config file path")
.alias('c', 'config')
.default('c', './package.json')
.describe('r', "vuepress dest docs path")
.alias('r', 'rootPath')
.default('r', './docs')
.describe('m', 'your blog readme path')
.alias('m', 'markdown')
.default('m', './README.md')
.describe('b', 'your blog base url')
.alias('b', 'blogUrl')
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