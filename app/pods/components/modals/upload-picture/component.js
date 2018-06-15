import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  firebaseApp: service(),
  uploadPhoto: task(function * (file) {
    let post = get(this, 'createPost')();
    const { name, size } = file.getProperties('name', 'size');
    const storageRef = get(this, 'firebaseApp').storage().ref();
    const uploadRef = storageRef.child(name);

    post.setProperties({
      'filename': name,
      'filesize': size
    });

    try {
      // file
      //   .readAsDataURL()
      //   .then((url) => {
      //     if (get(post, 'url') == null) {
      //       post.set('url', url);
      //     }
      //   });

      let response = yield uploadRef.put(file.blob);

      post.set('url', response.downloadURL);
      post.save();
    } catch (e) {
      post.rollback();
    }
  }).maxConcurrency(3).enqueue(),

  actions: {
    uploadImage(file) {
      get(this, 'uploadPhoto').perform(file);
    }
  }
});
