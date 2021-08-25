# Dev document

# Step 1: Add Typescript & ESLint support
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

# Step 2: Add `jest` for testing
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

# Step n: Add Prettier support

# Step n: Add dependency of `markdown-it-zhihu`
