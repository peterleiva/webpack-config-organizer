# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0]

### Changed

- repository name

### Fixed

- README syntax errors

## [0.2.0] - 2021-05-12

### Added

- [`organizer`](/lib/organizer.js) - Uses [`applyPresets`](/lib/apply-presets.js) and [`loadEnvironment`](/lib/load-environment.js) to load webpack configuration files. It also defines default applyPresets which can be loaded regarledess of environment options

## [0.2.0-alpha.1] - 2021-05-04

### Added

- [`applyPreset`](/lib/apply-presets.js) - Load a series of webpack configuration presets using webpack environment variables. Consist of predefined configs which can be used for separation of concerns or for rapid tests. [read more](https://webpack.js.org/guides/environment-variables/)
- [`load-environment`](/lib/load-environment.js) - Load webpack environment. You can use for define environment specific configuration. Common environments can be development, production, debug, test and so on
- [`loader`](/lib/loader.js) - Loads webpackc onfiguration file given it a path and environment object

[unreleased]: https://github.com/pherval/webpack-config-organizer/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/pherval/webpack-config-organizer/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/pherval/webpack-config-organizer/compare/v0.2.0-alpha.1...v0.2.0
[0.2.0-alpha.1]: https://github.com/pherval/webpack-config-organizer/compare/v0.1.0...v0.2.0-alpha.1
