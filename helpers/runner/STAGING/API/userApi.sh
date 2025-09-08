#!/bin/bash

npx cross-env ENV=STAGING HEADLESS=true TAGS=@USER-API npm run test