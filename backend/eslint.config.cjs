module.exports = [
	{
		files: ["*.js", "*.jsx", "**/*.js", "**/*.jsx"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module"
		},
		rules: {
			indent: ["error", "tab"],
			quotes: ["error", "double", { avoidEscape: true }],
			semi: ["error", "always"]
		}
	}
];