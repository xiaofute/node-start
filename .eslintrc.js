module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6":true,
        "node":true
    },
    "extends":["eslint:recommended","plugin:node/recommended"],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType":"module",
        "ecmaFeatures":{
         "experimentalObjectRestSpread":true,
         "modules":true
        }
    },
    "rules": {
        "node/exports-style": ["error", "module.exports"],
        "node/prefer-global/buffer": ["error", "always"],
        "node/prefer-global/console": ["error", "always"],
        "node/prefer-global/process": ["error", "always"],
        "node/prefer-global/url-search-params": ["error", "always"],
        "node/prefer-global/url": ["error", "always"],
        "indent": ["error",2],
        "linebreak-style": [0,"error", "windows"],
        "quotes": ["error","single"],
        "semi": ["error","always"],
        "no-console": "off",
    }
};