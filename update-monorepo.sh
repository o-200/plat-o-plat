#!/bin/sh
set -e

# Remotes
PLAT_REMOTE="plat-up"
OPLAT_REMOTE="oplat-up"

# Branch to sync
BRANCH="main"

# Subtree prefixes
PLAT_PREFIX="plat"
OPLAT_PREFIX="oplat"

# Function to add or pull a subtree
update_subtree() {
  PREFIX=$1
  REMOTE=$2
  BRANCH=$3

  # Check if the prefix folder exists
  if [ -d "$PREFIX" ]; then
    echo "Updating subtree $PREFIX..."
    git subtree pull --prefix="$PREFIX" "$REMOTE" "$BRANCH" --squash
  else
    echo "Adding subtree $PREFIX..."
    git subtree add --prefix="$PREFIX" "$REMOTE" "$BRANCH" --squash
  fi
}

# Fetch remotes
git fetch "$PLAT_REMOTE"
git fetch "$OPLAT_REMOTE"

# Update or add subtrees
update_subtree "$PLAT_PREFIX" "$PLAT_REMOTE" "$BRANCH"
update_subtree "$OPLAT_PREFIX" "$OPLAT_REMOTE" "$BRANCH"

# Push changes to origin
git push
