const { withServer } = require('../dist/withServer');
const { makeServer } = require('../stories/server');

export const decorators = [
  withServer(makeServer)
];
