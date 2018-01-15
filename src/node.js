import debug from './debug';

export default (Model, options) => {
  options = Object.assign({_id: '_id'}, options);
  debug('Node mixin for Model %s with options %O', Model.modelName, options);

  Model.defineProperty(options._id, {type: String, _id: true});

};
