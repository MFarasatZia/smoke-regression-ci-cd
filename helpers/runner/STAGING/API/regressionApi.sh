#!/bin/bash

npx cross-env ENV=STAGING HEADLESS=true TAGS=@REGRESSION-API npm run test