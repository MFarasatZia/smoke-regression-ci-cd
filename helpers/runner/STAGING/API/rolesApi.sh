#!/bin/bash

npx cross-env ENV=STAGING  HEADLESS=true TAGS=@ROLES-API npm run test