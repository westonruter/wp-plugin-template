/**
 * @type {import('lint-staged').Configuration}
 */
const config = {
	'*.{js,ts,mjs}': [ 'npx wp-scripts lint-js', () => 'npx tsc' ],
	'*.php': [ 'composer phpcs', () => 'composer phpstan' ],
};

module.exports = config;
