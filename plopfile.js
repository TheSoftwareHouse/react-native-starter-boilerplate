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

const reactContextGenerator = () => ({
  description: componentTypes.REACT_CONTEXT,
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'context name',
      validate: (input) => input.length > 1 || 'Context name cannot be empty!',
    },
  ],
  actions: function () {
    return [
      {
        type: 'add',
        path: 'src/context/{{camelCase name}}/{{camelCase name}}Context/{{pascalCase name}}Context.ts',
        templateFile: 'plop-templates/context/Context.hbs',
      },
      {
        type: 'add',
        path: 'src/context/{{camelCase name}}/{{camelCase name}}Context/{{pascalCase name}}Context.types.ts',
        templateFile: 'plop-templates/context/Context.types.hbs',
      },
      {
        type: 'add',
        path: 'src/context/{{camelCase name}}/{{camelCase name}}Context/{{pascalCase name}}Context.test.tsx',
        templateFile: 'plop-templates/context/Context.test.hbs',
      },
      {
        type: 'add',
        path: 'src/context/{{camelCase name}}/{{camelCase name}}ContextController/{{pascalCase name}}ContextController.tsx',
        templateFile: 'plop-templates/context/ContextController.hbs',
      },
      {
        type: 'add',
        path: 'src/context/{{camelCase name}}/{{camelCase name}}ContextController/{{pascalCase name}}ContextController.types.ts',
        templateFile: 'plop-templates/context/ContextController.types.hbs',
      },
      {
        type: 'add',
        path: 'src/hooks/use{{pascalCase name}}/use{{pascalCase name}}.ts',
        templateFile: 'plop-templates/context/useContext.hbs',
      },
      {
        type: 'add',
        path: 'src/hooks/use{{pascalCase name}}/use{{pascalCase name}}.test.tsx',
        templateFile: 'plop-templates/context/useContext.test.hbs',
      },
    ];
  },
});

const apiActionsGenerator = () => ({
  description: componentTypes.API_ACTIONS,
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'actions collection name',
      validate: (input) => input.length > 1 || 'Actions collection name cannot be empty!',
    },
  ],
  actions: function () {
    return [
      {
        type: 'add',
        path: 'src/api/actions/{{camelCase name}}/{{camelCase name}}.mutations.ts',
        templateFile: 'plop-templates/apiActions/apiActions.mutations.hbs',
      },
      {
        type: 'add',
        path: 'src/api/actions/{{camelCase name}}/{{camelCase name}}.queries.ts',
        templateFile: 'plop-templates/apiActions/apiActions.queries.hbs',
      },
      {
        type: 'add',
        path: 'src/api/actions/{{camelCase name}}/{{camelCase name}}.types.ts',
        templateFile: 'plop-templates/apiActions/apiActions.types.hbs',
      },
      {
        type: 'modify',
        path: 'src/api/actions/index.ts',
        pattern: getPlaceholderPattern('API_COLLECTION_IMPORTS'),
        template:
          "import { {{camelCase name}}Mutations } from './{{camelCase name}}/{{camelCase name}}.mutations';\nimport { {{camelCase name}}Queries } from './{{camelCase name}}/{{camelCase name}}.queries';\n$1",
      },
      {
        type: 'modify',
        path: 'src/api/actions/index.ts',
        pattern: getPlaceholderPattern('API_COLLECTION_QUERIES'),
        template: '...{{camelCase name}}Queries,\n  $1',
      },
      {
        type: 'modify',
        path: 'src/api/actions/index.ts',
        pattern: getPlaceholderPattern('API_COLLECTION_MUTATIONS'),
        template: '...{{camelCase name}}Mutations,\n  $1',
      },
    ];
  },
});

module.exports = function (plop) {
  plop.setGenerator(componentTypes.COMPONENT, componentGenerator());
  plop.setGenerator(componentTypes.SCREEN, screenGenerator());
  plop.setGenerator(componentTypes.REACT_CONTEXT, reactContextGenerator());
  plop.setGenerator(componentTypes.API_ACTIONS, apiActionsGenerator());
};
