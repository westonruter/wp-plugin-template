/**
 * External dependencies
 */
const wpConfig = require( '@wordpress/scripts/config/.eslintrc.js' );

const config = {
	...wpConfig,
	rules: {
		...( wpConfig?.rules || {} ),
		'jsdoc/valid-types': 'off',
	},
	env: {
		browser: true,
	},
	overrides: [
		...( wpConfig?.overrides || [] ),
		{
			files: [ 'tools/**/*.js' ],
			rules: {
				'import/no-extraneous-dependencies': [
					'error',
					{ devDependencies: true },
				],
			},
		},
	],
};

module.exports = config;
