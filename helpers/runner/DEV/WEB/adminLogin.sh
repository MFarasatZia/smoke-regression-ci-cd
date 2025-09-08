#!/bin/bash

npx cross-env ENV=DEV HEADLESS=true TAGS=@ADMIN-LOGIN npm run test
