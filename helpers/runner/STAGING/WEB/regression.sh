#!/bin/bash

npx cross-env ENV=STAGING HEADLESS=true TAGS=@REGRESSION npm run test