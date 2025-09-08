#!/bin/bash

npx cross-env ENV=STAGING HEADLESS=true TAGS=@CHECKPOINT-API npm run test