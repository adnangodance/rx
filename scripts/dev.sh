#!/bin/bash
export PATH="/Users/adnan/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PWD/node_modules/.bin:$PATH"
exec node /Applications/ChatGPT.app/Contents/Resources/cua_node/lib/node_modules/npm/bin/npm-cli.js run dev
