import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr(),
  name: DS.attr(),
  email: DS.attr(),
  gender: DS.attr(),
  image: DS.attr(),
  posts: DS.hasMany('post')
});
