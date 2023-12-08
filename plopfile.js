/* eslint-disable @typescript-eslint/no-var-requires */
const inquirer = require('inquirer');
const { readdirSync, lstatSync } = require('fs');
const path = require('path');

const isDirectory = (source) => lstatSync(source).isDirectory();

const getDirectories = (source) =>
  readdirSync(source)
    .map((name) => path.join(source, name))
    .filter(isDirectory);

const NAME_REGEX = /[^\/]+$/;

const screensCollections = getDirectories(`./src/screens`).map((screen) =>
  NAME_REGEX.exec(screen)[0].trimStart().trimEnd(),
);

const getPlaceholderPattern = (pattern) => new RegExp(`(\/\/ ${pattern})`, 's');

const componentTypes = {
  COMPONENT: 'React Native component',
  SCREEN: 'React Native screen',
  API_ACTIONS: 'API actions collection',
  API_QUERY: 'API query',
  API_MUTATION: 'API mutation',
  REACT_CONTEXT: 'React Context',
};

const componentGenerator = () => ({
  description: componentTypes.COMPONENT,
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'component name',
      validate: (input) => input.length > 1 || 'Component name cannot be empty!',
    },
  ],
  actions: function () {
    return [
      {
        type: 'add',
        path: `src/components/{{pascalCase name}}/{{pascalCase name}}.tsx`,
        templateFile: 'plop-templates/component/Component.hbs',
      },
      {
        type: 'add',
        path: `src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx`,
        templateFile: 'plop-templates/component/Component.test.hbs',
      },
      {
        type: 'add',
        path: `src/components/{{pascalCase name}}/{{pascalCase name}}.types.ts`,
        templateFile: 'plop-templates/component/Component.types.hbs',
      },
    ];
  },
});

const screenGenerator = () => ({
  description: componentTypes.SCREEN,
  prompts: [
    {
      type: 'list',
      name: 'directory',
      message: 'Choose an existing screen or type a new one:',
      choices: ['Create New Screen', new inquirer.Separator(), ...screensCollections],
      filter: (val) => (val === 'Create New Screen' ? '' : val),
    },
    {
      type: 'input',
      name: 'name',
      message: 'screen name',
      validate: (input) => input.length > 1 || 'Screen name cannot be empty!',
    },
  ],
  actions: function () {
    return [
      {
        type: 'add',
        path: `src/screens/{{directory}}/{{pascalCase name}}/{{pascalCase name}}.tsx`,
        templateFile: 'plop-templates/screen/Screen.hbs',
      },
      {
        type: 'add',
        path: `src/screens/{{directory}}/{{pascalCase name}}/{{pascalCase name}}.test.tsx`,
        templateFile: 'plop-templates/screen/Screen.test.hbs',
      },
      {
        type: 'modify',
        path: 'src/navigations/Navigator.types.ts',
        pattern: getPlaceholderPattern('SCREEN_PLOP_GENERATOR'),
        template: '{{pascalCase name}}: undefined;',
      },
    ];
  },
});

module.exports = function (plop) {
  plop.setGenerator(componentTypes.COMPONENT, componentGenerator());
  plop.setGenerator(componentTypes.SCREEN, screenGenerator());
};
