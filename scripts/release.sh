#!/bin/bash

# Publishes the version from package.json. Bump it first; this script does not.
# Pushes main and the version tag, which triggers .github/workflows/release.yml,
# then waits for the GitHub release to finish.
#
# Usage: yarn release

set -euo pipefail

unalias gh

fail() {
    echo "Error: $1" >&2
    exit 1
}

tag="v$(node -p "require('./package.json').version")"

[ "$(git branch --show-current)" = main ] || fail "releases are only made from main"
[ -z "$(git status --porcelain)" ] || fail "the working tree is not clean"

git fetch origin main --tags
git merge-base --is-ancestor origin/main HEAD || fail "main is behind origin/main"

if gh release view "$tag" >/dev/null 2>&1; then
    fail "release $tag already exists; bump the version first"
fi

head=$(git rev-parse HEAD)
if git rev-parse -q --verify "refs/tags/$tag" >/dev/null; then
    [ "$(git rev-parse "$tag^{commit}")" = "$head" ] || fail "tag $tag is not on HEAD; bump the version first"
fi
if [ -n "$(git ls-remote origin "refs/tags/$tag")" ]; then
    fail "tag $tag is already pushed; to retry, run: gh workflow run release.yml -f tag=$tag"
fi

yarn weok

# yarn version tags the bump itself; a hand-edited package.json leaves no tag
git rev-parse -q --verify "refs/tags/$tag" >/dev/null || git tag "$tag"

git push --atomic origin main "refs/tags/$tag"

echo "Waiting for the release workflow to start..."
for _ in {1..30}; do
    run_id=$(gh run list --workflow release.yml --commit "$head" --limit 1 --json databaseId --jq '.[0].databaseId')
    [ -z "$run_id" ] || break
    sleep 2
done
[ -n "$run_id" ] || fail "no release workflow run started for $tag"

gh run watch "$run_id" --exit-status
gh release view "$tag" --json url --jq .url
