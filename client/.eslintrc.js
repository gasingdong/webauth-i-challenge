module.exports = {
  "parser":  "@typescript-eslint/parser",
  "extends": [
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/react",
    "prettier/@typescript-eslint",
	  "plugin:prettier/recommended",
  ],
  "parserOptions": {
	  "ecmaVersion": 6,
	  "sourceType": "module",
	  "ecmaFeatures": {
      "jsx": true
    },
    "extraFileExtensions": [".vue"],
  },
  "env": { 
    "es6": true,
  },
  "globals": {
    "console": "readonly",
	  "document": "readonly",
	  "window": "readonly",
    "it": "readonly",
    "localStorage": "readonly",
  },
  "settings": {
	"react": {
	  "version": 'detect',
	  }
  }
};