#!/bin/sh

git fetch plat-up
git fetch oplat-up

git subtree pull --prefix=plat plat-up main --squash
git subtree pull --prefix=oplat oplat-up main --squash

git push
