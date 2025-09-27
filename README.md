# kub-mobile-app

<h1 align="center">
  <br>
    <img src="./assets/icons/app-icon.png" alt="Repository Banner" width="25%">  
  <br>
    KUB Mobile App
</h1>

## Description

This project serves as a React Native port of the existing KUB mobile applications.

The existing iOS and Android allow customers to manage their account, pay bills, view outages, and receive various push notifications.

We are investigating a port to React Native for a few reasons

- The development cycle for the iOS and Android apps is very slow. Flaky tests and slow build times hurt the developer experience.
- The apps are in Swift and Kotlin respectively, which are different from the rest of the KUB ecosystem.
- The apps have a lot of technical debt and do not follow best practices within Swift or Kotlin.

Porting to React Native will unify the apps under a single TypeScript codebase that is hopefully easier to work with.

## Getting Started

### Prerequisites

Please have the following installed on your machine:

- Node.js
- PNPM
- VSCode

Please have the following VSCode extensions installed:

- Prettier
- ESLint
- Code Spell Checker
- markdownlint

### Environment Variables

Environment variables are stored in `.env`.

These environment variables should _NOT_ contain any secrets.

All environment variables must be prefixed with `EXPO_PUBLIC_` to be bundled with the app.

### Set Up Expo

[Follow the Expo Android Simulator Documentation](https://docs.expo.dev/workflow/android-studio-emulator/) to set up the Android emulator.

[Follow the Expo iOS Simulator Documentation](https://docs.expo.dev/workflow/ios-simulator/) to set up the iOS emulator.

### Running the App

Before you run the app, you should execute a build of the project so things such as DevTools works.

Run `pnpm build:android` or `pnpm build:ios` to do a full build.

You only have to do this once unless you add a change that touches native modules.

To run the app, run `pnpm start` and follow the instructions to launch the iOS or Android emulator.

There are times you may need to run a prebuild instead of a full build.

Run `pnpm prebuild`to perform a prebuild.

### Contributing

Branch protections are enabled on this repository.
To contribute, please create a new branch and make a pull request.
The rules for branch names are lax, just be sure to include your name.

An example branch name for a card that adds a reset password email would be:

```text
rudra-reset-password-email
```

Your pull request title must follow the conventional commits specification. An example of a valid pull request title is:

```text
feat: Add pending form submissions table
```

All PRs must pass `pnpm check`, which checks for linting and type errors.

Run `pnpm lint` to check for linting errors.

Run `pnpm lint:fix` to attempt to automatically fix linting errors.

Run `pnpm tsc` to check for type errors.
