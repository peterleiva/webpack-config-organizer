# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v0.2.0-alpha.1] - 2021-05-04

### Added

- [`applyPreset`](/lib/apply-presets.js) - Load a series of webpack configuration presets using webpack environment variables. Consist of predefined configs which can be used for separation of concerns or for rapid tests. [read more](https://webpack.js.org/guides/environment-variables/)
- [`load-environment`](/lib/load-environment.js) - Load webpack environment. You can use for define environment specific configuration. Common environments can be development, production, debug, test and so on
- [`loader`](/lib/loader.js) - Loads webpackc onfiguration file given it a path and environment object

[unreleased]: https://github.com/peterleiva/webpack-build-tools/compare/v0.1.0...HEAD
