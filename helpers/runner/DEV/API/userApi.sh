#!/bin/bash

npx cross-env ENV=DEV HEADLESS=true TAGS=@USER-API npm run test
