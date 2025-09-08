
#  CI/CD Test Automation Pipeline + Cyborg Framework

[![Playwright](https://img.shields.io/badge/Tested%20With-Playwright-green?logo=microsoft)](https://playwright.dev)  
[![Cucumber](https://img.shields.io/badge/BDD-Cucumber-blue?logo=cucumber)](https://cucumber.io)  
[![Bitbucket Pipelines](https://img.shields.io/badge/CI-CD%20with%20Bitbucket-orange?logo=bitbucket)](https://bitbucket.org/product/features/pipelines)  
[![Slack](https://img.shields.io/badge/Reports-Slack%20%26%20HTML-blue?logo=slack)](https://slack.com)  

---

## 📌 About This Project  

This repository demonstrates a **production-ready CI/CD pipeline** I designed and implemented for **end-to-end test automation**.  

It integrates **Bitbucket Pipelines** with **Playwright** to run both **smoke and regression tests** for:  
- 🌐 **Web UI** (frontend)  
- 🔗 **API** (backend services)  

The pipeline executes across **multiple environments (DEV, STAGING, PROD)** and ensures fast feedback, clean reporting, and continuous quality validation.  

---

# Cyborg

Cyborg is a powerful BDD automation framework built on top of Playwright, designed to streamline the testing of modern application. With Cyborg, you can automate end-to-end tests and ensure the quality of our application by efficiently executing test scenarios.

## Table of Contents

- Features
- Getting started
- Running tests
- CLI variables
- Structure
- Adding new features
- Xpath Builder
- Reporting
- CodeGen
- Debugging
- ESlint
- Git Hooks
- VS Code extensions
- Git Do's & Don'ts

## Features

- Utilizes Playwright's powerful browser automation capabilities.
- Modular page objects and element locators for better organization.
- Built-in support for Cucumber for writing BDD-style test scenarios.
- Configurable test runners for parallel execution.
- Custom utilities and helpers for common tasks.
- Generates detailed HTML reports for test results.

## Getting started

- Install [nodejs](https://nodejs.org/en/download)
- Install [git](https://git-scm.com/downloads)
- Create a folder in your machine where you want to store this project
  > **Note**
  > Make sure the folder has unrestricted access
- Open gitbash in the folder created
- Clone project

```bash
git clone [repository-url] 
```

- Install dependencies

```bash
npm install
npx playwright install
```

Now you have successfully completed the setup

## Running tests

> **Note**
> Please use gitbash for execution as in powershell the report is not generated if the scenario fails

This framework is highly dynamic in terms of executing code. Select appropriate options while running the tests.

```bash
npm run test --ENV=DEV --TAGS=@user
```

## CLI variables

We can set environment variable as described in `types/env.d.ts`.

- Environment `--Env=DEV` mandatory - Environment in which you want to execute tests

  Any value other than the prescribed value will throw error as coded in `helpers/hooks.ts`

- Tags `--TAGS=@tag1 or @tag2` mandatory - Tags you want to run
- Browser `--BROWSER=chrome` optional - Browser on which test will be executed

  Valid values are `chrome`, `firefox` and `webkit`

- Headless `--HEADLESS=true` optional - Browser mode to execute the test

  Valid values are `true` and `false`. Default value is `false`

- Video `--VIDEO=true` optional - Records video for the execution which is saved in `test-results`

  Valid values are `true` and `false`. Default value is `false`

## Structure

### A top-level directory layout

    .
    ├── github\workflows\main.yml             # Used for post commit linting
    ├── husky                                 # Used for pre commit linting
    ├── .vscode
        ├── launch.json                       # Used for debugging
        ├── settings.json                     # Used for vscode setting (fix lint errors on ctrl+s)
    ├── config\cucumber.js                    # Main file for cucumber settings like parallelization
    ├── test
        ├── features                          # Contains cucumber features
        ├── helpers
            ├── environment                   # Contains environment files with env variables
            ├── report                        # Files for report generation
            ├── util                          # Conatain generic functions
            ├── BaseClass.ts                  # This contains all fundamental methods like click and enter text
            ├── browserHelper.ts              # Invokes browser
            ├── customWorld                   # Custom world to store scenrio specefic info
            ├── hooks.ts                      # Hooks are functions executed handelled executed by cucumber to manage workflow
            ├── jsonHelper                    # Helps to get json objects from test data
        ├── pages                             # Contain methods for each page
        ├── steps                             # Contains step files for each page
        ├── testData                          # Contains any test data
        ├── types                             # Contains process environment variable type
        ├── xpath                             # Contains xpaths for all pages
    ├── test-results                          # (gitignore) Contains reports, screenshots and videos
    ├── .eslintrc.js                          # ESlint config
    ├── .gitattributes
    ├── .gitignore                            # Contains ignored files for git
    ├── @rerun.txt                            # (gitignore) Contains failed scenarios
    ├── package-lock.json                     # packages
    ├── package.json                          # packages
    ├── README.md
    └── tsconfig.json                         # compiler options for ts

## Reporting

This framework uses [cucumber html report](https://www.npmjs.com/package/cucumber-html-reporter) for report generation. Cucumber generates a cucumber.json file after execution which is used to generate html report. Report generator and config can be found under `helpers/report/reportHelper.ts`

Reports will be generated under `test-results/report`


## Logger

This framework uses [winston](https://github.com/winstonjs/winston) logger to log actions and errors being performed. Config files can be found under `helpers/util/logger.ts`. Logger will generate different log files for each scenario to support parallel run.

Logs will be generated under `test-results/logs`

## CodeGen

Codegen is a powerful tool that generates code for any operation executed on browser. This tool helps to remove blockers such as ambiguity on how to automate something.

```bash
npx playwright codegen [url]
```

## Debugging

Debug configuration can be found under `.vscode/launch.json`. We can go tio run and debug tab on the left and select `Cucumber Debug` option from the dropdown and run. The runtime arguments present in the config file will run
the mentioned scenario in debug mode and hit breakpoints during execution.

```json
"runtimeArgs": [
        "run",
        "test",
        "--ENV=QA",
        "--BROWSER=chrome",
        "--HEADLESS=false",
        "--TAGS=@home"
      ],
```

## ESlint

ESlint is a library that helps you fix errors in your code and enforce coding rules to produce consistent quality code.

Some of the rules used in this project are-

- Use of tab for indentation
- Use of double quotes for string
- Mandatory use of semicolon

Extended plugins used

- @typescript-eslint/eslint-plugin
- eslint-plugin-playwright

Commands

- Finding errors
  ```bash
  npx eslint .
  ```
- Fixing errors
  ```bash
  npm run lint
  ```
  or
  ```bash
  npx eslint . --fix
  ```

## Git Hooks

There are two types of hooks configured in this project pre-commmit and post commit. The hooks will automatically fix minor error in the project.

- Pre commit hook

  This will check for errors and fix them whenever someone will commit some code. Pre commit config can be found under `.husky/pre-commit`

- Post push hook

  This is handled by github actions. This will fix any errors found in the pushed code. Config can be found under `github/workflows/main.yml`

## VS Code extensions

- ms-vscode.vscode-typescript-next - Typescript Support
- alexkrechik.cucumberautocomplete - Cucumber support
- dbaeumer.vscode-eslint - Eslint integration
- usernamehw.errorlens - Improve highlighting of errors, warnings and other language diagnostics
- GitHub.copilot - AI pair programmer

## Git Do's & Don'ts

Do's

- Always create a new branch for every new feature or scenario
- Regularly commit and push changes to the remote branch to avoid loss of work.
- Always commit changes with a concise and useful commit message.
- Always create a pull request for merging changes from one branch to another with an approver.
- Always review your code once by yourself before creating a pull request.
- Delete branches if a feature is merged to the main branch

Don'ts

- Don’t commit directly to the main branches.
- Never commit application secrets.
- Don’t commit large files in the repository.
- Don’t work on multiple features in the same branch
- Don’t do a force push until you’re extremely comfortable performing this action
- Don't modify the repository
