#!/bin/bash
git filter-branch -f --env-filter '
if [ "$GIT_AUTHOR_EMAIL" = "bot@greentrace.app" ]; then
    export GIT_AUTHOR_NAME="Parteek Garg"
    export GIT_AUTHOR_EMAIL="gargparteek1907@gmail.com"
    export GIT_COMMITTER_NAME="Parteek Garg"
    export GIT_COMMITTER_EMAIL="gargparteek1907@gmail.com"
fi
' HEAD~25..HEAD
