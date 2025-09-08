#!/bin/bash

npx cross-env ENV=DEV HEADLESS=true TAGS=@ADMIN-ACCOUNTS npm run test
