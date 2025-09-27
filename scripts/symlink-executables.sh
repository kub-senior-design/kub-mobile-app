#!/usr/bin/env bash
cd /mnt/c/Users/patel/AppData/Local/Android/Sdk

function symlink_executables() {
  find . -type f -name '*.exe' -print0 |
  while IFS= read -r -d '' f; do
    target="$(basename "$f")"
    link="$(dirname "$f")/$(basename "${f%.exe}")"
    ln -sf "$target" "$link"
    echo "symlinked $target as $(basename "$link")"
  done 
}

echo "symlinking build-tools"
cd build-tools
symlink_executables
cd ..

echo "symlinking platform-tools"
cd platform-tools
symlink_executables
cd ..

echo "symlinking cmake"
cd cmake
symlink_executables
cd ..

echo "symlinking ndk"
cd ndk
symlink_executables