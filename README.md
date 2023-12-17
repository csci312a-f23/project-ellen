[![Node.js CI](https://github.com/csci312a-f23/project-ellen/actions/workflows/node.js.yml/badge.svg?branch=test-pull-request)](https://github.com/csci312a-f23/project-ellen/actions/workflows/node.js.yml)

# Project Description

MiddHousing is a webApp that allows students to find accurate information about individual dorm rooms and rate previous rooms they have lived in. Students will also have the ability to sort their searches based on specific preferences and see the campus map for specific locations.

# Link to deployment

[Depoyed Web App](https://ellen.csci312.dev)

# Project Skeleton

## Development Environment

Need to set up a project with neon and add to your .env.local and .env.development.local file.
Run the following commands:
npx knex migrate:latest
npx knex seed:run
These will migrate and seed the database.
Then you should be able to run:
npm run dev
Docker should automatically start when you run npm run dev.
MiddHousing requires a Google authentication client id and client secret, and next auth key.

## Creation

This project skeleton has been setup similar to our assignments and practicals. It is a Next.JS application, created with create-next-app `💻 npx create-next-app@latest`, which uses Jest and Testing Library for testing, ESLint for static analysis, Prettier for styling, and is configured to use GitHub actions for testing pull requests.

Development dependencies installed with:

```
💻 npm install -D jest jest-environment-jsdom husky lint-staged prettier eslint-config-prettier @testing-library/react @testing-library/jest-dom
💻 npx install-peerdeps --dev eslint-config-airbnb
💻 npm install -D eslint-import-resolver-alias
```

Other dependencies installed with:

```
💻 npm install -S prop-types
```

### Additional tools you might need

#### Mocking fetch

Tools for mocking fetch can be installed with

```
💻 npm install -D fetch-mock-jest node-fetch@2.6.7
```

Note we need to pin the `node-fetch` version due to breaking changes when used with Jest in newer versions.
