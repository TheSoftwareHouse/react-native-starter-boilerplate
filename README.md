# React Native Boilerplate

This project was bootstrapped with [React Native CLI](https://reactnative.dev/docs/environment-setup). Make sure you
configured environment as described in above tutorial.

## Setup

If after environment configuration you will get error

```
SDK location not found.
```

- Go to `android/ `
- Create a file `local.properties ` and add this line :

```bash
sdk.dir = /Users/USERNAME/Library/Android/sdk
```

Where `USERNAME` is your macOS username

## Installation

Use the package manager yarn to install the app.

```bash
cp .env.dist .env
yarn
```

#### Run metro:

```bash
yarn start
```

#### For iOS:

```bash
yarn ios
```

#### For Android:

```bash
yarn android
```

## Folders structure explanation

- src
  - api `API configuration`
  - assets `Assets used in project`
  - components `Reusable components`
  - context `Context config (e.g. app theme, app locale)`
  - hooks `Reusable custom hooks`
  - i18n `Translations configuration`
  - navigations `Navigation configuration`
  - redux `State management configuration`
  - screens `Separated app screens`
  - styles `Shared styles configuration related to theme (e.g. colors)`
  - tests `Test configuration`
  - utils `Reusable functions, helpers (e.g. date format function)`

## Navigations

In this boilerplate we use `react-navigation` to navigate around the screens (screens are equivalent to pages in web
apps). This library supports 3 navigation types, each as separate module:

- stack - `@react-navigation/stack`
- bottom tabs - `@react-navigation/bottom-tabs`
- drawer - `@react-navigation/drawer`

To use them, you need to create navigator instance outside the rendering function with a method from one of the modules
listed above. For example, for bottom tabs, the method usage looks like this: `const Tab = createBottomTabNavigator()`,
where you can pass generic value, which is equivalent to `Record<YourCustomRouteNames, undefined>`. The return value of
the function returns object with Elements needed to create navigation, where:

- `Navigator` is the wrapper where you can customize general settings for the navigator
- `Screen` which creates screen (similar to `<Route>` tag in React Router) requires two props:
  - `name` - name of the route (defined in the navigator type if you passed it to the factory method)
  - `component` - the component to render when users selects the link
- `Group` for grouping the screens inside the `Navigator`

You can preview each of them in following folders:

- stack - `src > navigations > Navigator.tsx`
- bottom tabs - `src > Profile > Profile.tsx`
- drawer - `src > ProfileDrawer > ProfileDrawer.tsx`
- drawer + bottom tabs - `src > SharedNavProfile > SharedNavDrawer.tsx`

You can read more about the react navigation at: https://reactnavigation.org/docs/getting-started

## Deployment

### AppCenter

- Environment variables need to have `RN_` prefix. For example if your variable is `BACKEND_URL`(in `.env` file) it
  should be added as `RN_BACKEND_URL` to the App Center.

## Storybook

To open storybook:

1. Define the `STORYBOOK_ENABLED=true` env in your local `.env` file
1. Start metro bundler using `yarn start` or `yarn start-cache`
1. Run ios/android build using `yarn ios` or `yarn android`

## Troubleshooting

### Changes in .env file are not reflected in ios application even after rebuild

To see the latest changes you may need to run `cd ios && pod install` and then rebuild the project.
