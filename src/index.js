import {deprecate} from 'util';

import node from './node';

export default deprecate((app) => {
  app.modelBuilder.mixins.define('Node', node);
}, 'app.modelBuilder.mixins.define: Use mixinSources instead; ' +
    'see https://github.com/mrbatista/loopback-node-arangodb');

