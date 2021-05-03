# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- [`applyPreset`](/lib/apply-presets.js) to load webpack configuration files presets using webpack environment variables. Consist of predefined configs which can be used for separation of concerns or for rapid config tests. [read more](https://webpack.js.org/guides/environment-variables/)
- [`load-environment`](/lib/load-environment.js) load various webpack environment. You can use for define configuration specific for a environment, common environments can be development, production, debug, test and so on

[unreleased]: https://github.com/peterleiva/webpack-build-tools/compare/v0.1.0...HEAD
