#!/bin/bash

npx cross-env ENV=DEV HEADLESS=true TAGS=@SMOKE-API npm run test
