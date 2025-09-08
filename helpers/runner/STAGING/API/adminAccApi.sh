#!/bin/bash

npx cross-env ENV=STAGING HEADLESS=true TAGS=@ADMIN-ACCOUNTS-API npm run test
