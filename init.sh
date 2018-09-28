#!/bin/bash

npmcheck() {
	npm list -g --depth=0 $1 > /dev/null 2>&1 && {
	  echo "$1 === 已安装"
	} || {
		echo "安装 === $1"
	  npm install -g $1
	}
}

yarncheck() {
	if type yarn >/dev/null 2>&1; then
		echo 'exists yarn'
	else
		echo 'no exists yarn'
		brew install yarn
	fi
	yarn
}

rm -rf dist
rm -rf node_modules

mkdir dist

npmcheck wepy-cli
npmcheck wept

yarncheck
