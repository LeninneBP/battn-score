#!/bin/bash
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Instala o Node.js LTS em https://nodejs.org"
  exit 1
fi
npm install
npx expo start
