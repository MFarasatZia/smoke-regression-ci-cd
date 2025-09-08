#!/bin/bash

npx cross-env ENV=DEV HEADLESS=true TAGS=@REGRESSION-API npm run test