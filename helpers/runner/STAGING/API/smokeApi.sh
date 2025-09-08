#!/bin/bash

npx cross-env ENV=STAGING HEADLESS=true TAGS=@SMOKE-API npm run test