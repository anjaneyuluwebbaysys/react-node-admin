"use strict";
const presets = [
	[
			"@babel/preset-env",
			{
				"targets": {
					"node": "current",
				},
			},
		],["es2015", "stage-2"]
	];

const plugins = ["@babel/plugin-transform-class-properties", "@babel/plugin-transform-object-rest-spread"];
const only = ["./service/", "index.js"];

module.exports = {only, presets, plugins };