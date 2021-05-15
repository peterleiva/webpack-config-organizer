[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

[![Publish package to npm](https://github.com/peterleiva/webpack-config-organizer/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/peterleiva/webpack-config-organizer/actions/workflows/npm-publish.yml)

[![Build & Test](https://github.com/peterleiva/webpack-config-organizer/actions/workflows/build-test.yml/badge.svg)](https://github.com/peterleiva/webpack-config-organizer/actions/workflows/build-test.yml)

# Webpack config organizer

Webpack helper to organize your configurations, separating
them by concerns. The package achieve that by using two scope
of files: presets and environments. Thereof you can define two
types of files and both of them relies upon webpack `--env` CLI
option. Environment configuration files help you define a config
for different kinds of environments (dev, prod, debug, ci , and so on),
while presets help you create predefined settings which help you
to fast test a new build or just use make it cleaner

## Installation

Install using npm

```bash
  npm install --save-dev webpack-config-organizer
```

## Usage

First, you need to define a search path for your configs. You can use
[`cosmiconfig`](https://github.com/davidtheclark/cosmiconfig)
to tell where to look for (`package.json` or `.webpack-config-organizerrc.json`):

```json
// package.json
{
    "webpack-config-organizer": {
        "base": "path/to/your/env-and-presets-configs/", // relative to your project folder
        "environment: {
            "path": "/base/path/to/environment/configs/", // relative to "base"
            "prefix": "env-files-prefix"
        },
        "presets": {
            "path": "/base/path/to/presets/configs/", // relative to "base"
            "prefix": "presets-prefix"
        }
    }
}
```

At your `webpack.config.js` file use the tool to load your
configurations

```javascript
const { organizer } = require("webpack-config-organizer")

module.exports = organizer({
    entry: "./src/main.js"
    output: {
        file: "[name].js"
    }
})
```

## Using defaults presets

You can define default presets which is always loaded

```javascript
const { organizer } = require("webpack-config-organizer")

module.exports = organizer(["typescript", "analyzer"], {
    entry: "./src/main.js"
    output: {
        file: "[name].js"
    }
})
```

## Examples

Suppose you have the following configs

```bash
$ cd project-folder
$ ls build-tools/*

  build-tools/env:
  webpack.development.js
  webpack.debug.js
  webpack.ci.js

  build-tools/presets:
  webpack.typescript.js
  webpack.analyzer.js
```

and the given search parameters:

```json
// package.json
{
    "webpack-config-organizer": {
        "base": "build-tools",
        "environment: {
            "path": "env",
            "prefix": "webpack."
        },
        "presets": {
            "path": "presets",
            "prefix": "webpack."
        }
    }
}
```

To load **`typescript` and `analyzer` presets** and **`debug` environment**:

```bash
$ npx webpack --env mode=debug --env.presets.typescript --env.presets.analyzer
```

### default presets

If you don't want to specify presets using the CLI, you can load them
no matter what:

```javascript
const { organizer } = require("webpack-config-organizer")

module.exports = organizer(["typescript", "analyzer"], {
    entry: "./src/main.js"
    output: {
        file: "[name].js"
    }
})
```

**typescript** and **analzer** presets will be always loaded:

```bash
$ npx webpack
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/peterleiva/webpack-config-organizer
```

Go to the project directory

```bash
  cd webpack-config-organizer
```

Install dependencies

```bash
  npm install
```

Build the application optionally

```bash
  npm run build
```

## Running Tests

To run tests, run the following command

```bash
  npm t
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
