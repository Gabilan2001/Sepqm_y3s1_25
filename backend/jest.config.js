// jest.config.js
export default {
    transform: {
      '^.+\\.js$': 'babel-jest',  // Use babel-jest to transform .js files
    },
    testEnvironment: 'node',  // Node environment for backend tests
    moduleFileExtensions: ['js', 'json', 'node'],
    globals: {
      'babel-jest': {
        useESModules: true,  // Ensure babel-jest uses ESModules
      },
    },
  };
  