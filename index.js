#!/usr/bin/env node

const chalk = require('chalk')
const fs = require('fs-extra')
const yargs = require('yargs')
const auto = require('./auto-read')

const args = yargs
.usage('Usage: $0 --config=config --destpath=destpath')
.describe('config', "config file path")
.default('config', './package.json')
.describe('destpath', "vuepress dest docs path")
.default('destpath', './docs')
.describe('blogUrl', 'your blog base url')
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