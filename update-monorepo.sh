#!/bin/sh

git fetch plat-remote
git fetch oplat-remote

git subtree pull --prefix=plat  plat-remote  main -m "sync plat"
git subtree pull --prefix=oplat oplat-remote main -m "sync oplat"

git push
