# Dev document

# Step 1: Add a new repository in GitHub [optional]

Add a new repository.
- A README.md file 
- A .gitignore file
- A LICENSE file

# Step 2: Add Typescript & ESLint support
<https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md>
```sh
npm i --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Add .eslintrc.js

# Add .eslintignore

node ./node_modules/typescript/bin/tsc --init

## https://www.npmjs.com/package/eslint-plugin-node
npm install --save-dev eslint eslint-plugin-node
# Edit .eslintrc.json
```

# Step 3: Add `jest` for testing
<https://basarat.gitbook.io/typescript/intro-1/jest>
```sh
npm i jest @types/jest ts-jest typescript -D
```

<https://github.com/kulshekhar/ts-jest>
```sh
npx ts-jest config:init
```

Modify `jest.config.js` according the first link.
Be careful that `testMatch` (we use default) is based on `roots` (also use default).

# Step n: Add Prettier support [optional]
<https://prettier.io/docs/en/install.html>
- `npm install --save-dev --save-exact prettier`
- `echo {}> .prettierrc.json`
<https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md>
- `npm install --save-dev eslint-config-prettier`
- 修改`.eslintrc.js`
  ```js
  {
  "extends": [
      "其它配置，注意prettier要放在最后一个",
      "prettier"
  ]
  }
  ```

If use VS Code
- Install extension of [`Prettier - Code formatter`](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).
- `Ctrl-Shift-P` -> `references: Open Workspace Settings (JSON)`. Merge below to the json.
```json
{
    "editor.defaultFormatter": null,
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[jsonc]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.formatOnType": true,
    "editor.formatOnSave": true,
}
```
It seems format on save not work??






# Step n: Add dependency of `markdown-it-zhihu`


# Step n: Publish to npm
