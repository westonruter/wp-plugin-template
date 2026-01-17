# Agents Context: WP Plugin Template

This `AGENTS.md` file provides essential context and instructions for working with the **WP Plugin Template** project. This project serves as a boilerplate for developing high-quality WordPress plugins.

## Project Overview

* **Type:** WordPress Plugin Boilerplate
* **Primary Languages:** PHP (7.4+), TypeScript/JavaScript, CSS
* **Frameworks/Tools:** WordPress (6.9+), Composer, Node.js (npm), GitHub Actions

## Environment Setup

Ensure the following tools are installed and configured:

1. **Node.js:** Version matching `.nvmrc`.
2. **Composer:** Version 2+.
3. **PHP:** Version 7.4 or higher.

**Initial Setup Command:**

```bash
npm install && composer install
```

## Development Workflow

### Key Commands

| Command                    | Description                                                              |
|:---------------------------|:-------------------------------------------------------------------------|
| `npm run lint`             | Runs **all** static analysis checks (PHP, JS, CSS, JSON, Markdown).      |
| `npm run format`           | Automatically fixes code style issues in all supported files.            |
| `npm run plugin-zip`       | Builds the plugin into a ZIP file for distribution (excludes dev files). |
| `composer phpstan`         | Runs PHPStan static analysis.                                            |
| `composer phpcs`           | Runs PHP CodeSniffer to enforce WordPress Coding Standards.              |
| `composer phpcbf`          | Automatically fixes PHP CodeSniffer violations.                          |
| `npm run lint:js`          | Lints JavaScript/TypeScript files using ESLint.                          |
| `npm run lint:css`         | Lints CSS/SCSS files using Stylelint.                                    |
| `npm run transform-readme` | Generates `readme.txt` from `README.md`.                                 |

### Creating a New Plugin

## Codebase Structure

* **`wp-plugin-template.php`**: The main plugin entry point. Contains headers and initialization logic.
* **`composer.json`**: Manages PHP dependencies and scripts (including WPCS and PHPStan).
* **`package.json`**: Manages Node.js dependencies and top-level build/lint scripts.
* **`tools/`**: Contains utility scripts and configuration (`transform-readme.php`, `verify-version-consistency.php`).
* **`.github/workflows/`**: CI/CD pipelines for static analysis (`static-analysis.yml`) and plugin checks (`plugin-check.yml`).

## Coding Conventions

* **PHP:** Strictly adhere to [WordPress Coding Standards (WPCS)](https://github.com/WordPress/WordPress-Coding-Standards).
* **JavaScript:** Follow [WordPress JavaScript coding standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/), except that Prettier formatting is used.
* **CSS:** Follow [WordPress CSS coding standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/css/).
* **Documentation:** Maintain `README.md` as the source of truth. The `readme.txt` file for the WordPress.org repository is generated automatically.
* **Versioning:** Ensure version consistency across `package.json`, `composer.json`, and the main PHP file header. Use `npm run verify-version-consistency` to check.

See [style guide](./.gemini/styleguide.md) for more.

## Architecture & Patterns

* **Namespacing:** All PHP code is namespaced under `WPPluginTemplate`.
* **Testing:** Relies heavily on static analysis (PHPStan, ESLint, Stylelint) to ensure code quality.
* **Plain JavaScript:** Do not write TypeScript, but rather use features from modern JavaScript (e.g. ES11) and add JSDoc which contains TypeScript types. There should be no build step required to run the plugin.

## Instructions for Agents

1. **Linting:** Always run `npm run lint` (or specific sub-tasks) after making changes to verify correctness.
2. **Formatting:** Use `npm run format` to fix style violations instead of manually formatting, whenever possible.
3. **Dependencies:** Check `package.json` and `composer.json` before adding new libraries. Prefer existing WordPress core libraries where applicable. In GitHub actions workflows, ensure all dependencies are pinned to a specific SHA, followed by the version in a comment.
