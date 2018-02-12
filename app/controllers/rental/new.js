import Ember from 'ember';

export default Ember.Controller.extend({
    title: '',
    actions: {
        createRental() {
            this.get('target').send('createRental', this.get('title'));
        }
    }
});