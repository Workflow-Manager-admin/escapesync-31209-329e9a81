#!/bin/bash
cd /home/kavia/workspace/code-generation/escapesync-31209-329e9a81/escape_sync
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

