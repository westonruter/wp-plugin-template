/**
 * @type {import('lint-staged', { with: { 'resolution-mode': 'import' } }).Configuration}
 */
const config = {
	'*.{js,ts,mjs}': [
		'wp-scripts lint-js --ignore-path=.gitignore',
		() => 'npx tsc --allowJs --noEmit',
	],
	'**/*.json': [ 'npm run lint:json' ],
	'*.css': [ 'npm run lint:css' ],
	'composer.{json,lock}': [
		() => 'composer validate --strict --no-check-all',
		() => 'composer normalize --dry-run',
	],
	'*.php': [
		'composer phpcs',
		() => 'composer phpstan',
		() => 'npm run verify-version-consistency',
	],
	'*.md': [ 'npm run lint:md' ],
	'/README.md': [
		() => 'npm run verify-version-consistency',
		() => 'npm run transform-readme',
	],
};

module.exports = config;
