# Agent Discoveries Application

# Requirements

This project requires Node 16 or above.

# Overview

There are two node projects: `agent-discoveries-backend` and
`agent-discoveries-frontend`.

# Setting up the project

Open the terminal at the root of the project.

Run `npm install`.

This will install dependencies for all folders.

There will be a `.env` file in the `agent-discoveries-backend` directory.
This will be where you put your local environment variables.

# Running the application

Open the terminal at the root of the project.

Run `npm run dev` to start up the project in development mode.

Press `Ctrl + C` in the terminal to stop the project.

# Database

Knex

# Tests

Tests are found next to the file they test.

E.g. The test file for `./agent-discoveries-backend/src/app.ts` is
`./agent-discoveries-backend/src/app.test.ts`

To run all tests, run `npm test` in the root of the project.

You can also use the `Jest` extension in VSCode, and run tests more
selectively using the testing tab.
