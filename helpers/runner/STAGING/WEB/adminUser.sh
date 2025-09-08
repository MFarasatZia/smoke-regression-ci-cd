#!/bin/bash

npx cross-env ENV=STAGING HEADLESS=true TAGS=@ADMIN-USERS npm run test