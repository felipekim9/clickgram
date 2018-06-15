import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    // return this.get('store').findRecord('user', 1)
  },

  actions: {
    createPost() {
      return this.get('store').createRecord('post');
    }
  }
  // afterModel() {
  //   this.get('store').createRecord('user', {
  //     name: 'Felipe Kim',
  //     username: 'felipekim9',
  //     email: 'felipekim9@gmail.com',
  //     gender: 'male',
  //     image: ''
  //   }).save();
  // }

});
