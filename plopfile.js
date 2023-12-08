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

module.exports = function (plop) {
  plop.setGenerator(componentTypes.COMPONENT, componentGenerator());
};
