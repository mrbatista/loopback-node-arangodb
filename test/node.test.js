import ArangoDBConnector from 'loopback-connector-arangodb';
import {DataSource, ModelBuilder} from 'loopback-datasource-juggler';

import './should';

import node from '../src/node';

const modelBuilder = new ModelBuilder();
const mixins = modelBuilder.mixins;

describe('Node', () => {
  const arangodb = new DataSource('arangodb', {connector: ArangoDBConnector},
    modelBuilder);

  mixins.define('Node', node);

  const Friend = arangodb.createModel('Friend',
    {
      name: String,
      type: {type: Number, default: 1},
      created: {type: Date, defaultFn: 'now'},
    },
    {forceId: false, mixins: {Node: true}}
  );
  const CustomFriend = arangodb.createModel('CustomFriend',
    {
      name: String,
      type: {type: Number, default: 1},
      created: {type: Date, defaultFn: 'now'},
    },
    {
      forceId: false,
      arangodb: {collection: 'Friend'},
      mixins: {Node: {_id: 'completeId'}},
    }
  );

  it('default name for field _id', () => {
    const properties = Friend.definition.properties;
    const _id = properties._id;
    should.exist(_id);
    _id.type.should.be.equal(String);
    _id._id.should.be.equal(true);
  });

  it('custom name for field _id', () => {
    const properties = CustomFriend.definition.properties;
    const completeId = properties.completeId;
    should.exist(completeId);
    completeId.type.should.be.equal(String);
    completeId._id.should.be.equal(true);
  });
});

