#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# Commit changes.
msg="deploy `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git add -A
git commit -m "${msg}"
echo 'local commited'

git push -f https://github.com/lq782655835/node-vuepress-auto-read.git master
echo 'remote commited'
# cd -

# str='test'
# str2="this is $str"
# str3="this is ${str}"
# arr=('1' '2')
# bol=[ $str = $str2 ]
# echo this is test # this is test
# echo $str # test
# echo $str2 # this is test
# echo $str3 # this is test
# echo ${arr[1]} # 2
# echo $bol

# echo $1 # 123
# echo $# # 2
# echo $* # 123 123