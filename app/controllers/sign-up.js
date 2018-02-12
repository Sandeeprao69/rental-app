import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        signup() {
            this.get('target').send('signUp');
        }
    }
});