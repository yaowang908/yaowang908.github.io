#!/bin/bash
# Git add wrapper that runs build before adding files
# To use: source this file or add the function to your .zshrc

git() {
  if [ "$1" = "add" ]; then
    echo "🔨 Building project before git add..."
    bun run build
    command git add "${@:2}"
    echo "✅ Build complete and files staged"
  else
    command git "$@"
  fi
}

