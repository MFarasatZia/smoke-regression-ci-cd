#!/bin/bash

npx cross-env ENV=STAGING HEADLESS=true TAGS=@SMOKE npm run test