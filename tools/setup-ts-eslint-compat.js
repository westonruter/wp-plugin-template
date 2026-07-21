#!/usr/bin/env node

/**
 * Sets up TypeScript 6 compatibility shims for typescript-eslint tools.
 *
 * TypeScript 7 completely redesigned its package API, removing the programmatic
 * compiler API (e.g. ts.Extension, ts.ModuleKind, ts.TypeFlags) that
 * typescript-eslint currently depends on. Until typescript-eslint adds support
 * for TypeScript 7 (see https://github.com/typescript-eslint/typescript-eslint/issues/10940),
 * this script makes the TypeScript 6 API available in the nested node_modules
 * locations where typescript-eslint tools look for it.
 *
 * The `typescript-legacy` package in devDependencies provides TypeScript 6.x
 * installed at node_modules/typescript-legacy, and this script symlinks it to
 * the locations used by typescript-eslint.
 */

'use strict';

const path = require( 'path' );
const fs = require( 'fs' );

const root = path.resolve( __dirname, '..' );
const typescriptLegacyDir = path.join(
	root,
	'node_modules',
	'typescript-legacy'
);

if ( ! fs.existsSync( typescriptLegacyDir ) ) {
	// typescript-legacy not installed, skip silently.
	process.exit( 0 );
}

// Locations that @typescript-eslint tools resolve `require('typescript')` from.
// These are determined by Node.js module resolution starting from the package
// that calls `require('typescript')` and walking up the directory tree.
const targets = [
	// For @typescript-eslint/typescript-estree nested inside @wordpress/eslint-plugin.
	path.join(
		root,
		'node_modules',
		'@wordpress',
		'eslint-plugin',
		'node_modules',
		'typescript'
	),
	// For ts-api-utils (used by @typescript-eslint/typescript-estree).
	path.join(
		root,
		'node_modules',
		'ts-api-utils',
		'node_modules',
		'typescript'
	),
];

for ( const target of targets ) {
	if ( fs.existsSync( target ) ) {
		// Already set up (e.g. from a previous postinstall run).
		continue;
	}

	const targetDir = path.dirname( target );
	if ( ! fs.existsSync( targetDir ) ) {
		// Create parent directory (it may not exist when the package has no nested deps yet).
		fs.mkdirSync( targetDir, { recursive: true } );
	}

	const relativeSource = path.relative( targetDir, typescriptLegacyDir );
	fs.symlinkSync( relativeSource, target, 'junction' );
	process.stdout.write(
		`[setup-ts-eslint-compat] Symlinked TypeScript 6 to ${ path.relative(
			root,
			target
		) }\n`
	);
}
