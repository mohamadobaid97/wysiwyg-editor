module.exports = {
    preset: 'ts-jest',  // Ensures ts-jest is used to handle TypeScript files
    testEnvironment: 'jsdom',  // Use jsdom for testing in the browser-like environment
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],  // Setup Jest after environment is ready
  };