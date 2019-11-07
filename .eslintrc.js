module.exports = {
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 6
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            2,
            4,
            {
                "SwitchCase": 1
            }
        ],
        "semi": [
            2,
            "always"
        ],
        "quotes": [
            2,
            "double"
        ],
        "camelcase": [
            2,
            {
                "properties": "always"
            }
        ]
    }
};
