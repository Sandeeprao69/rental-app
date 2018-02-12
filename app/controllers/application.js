import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        createRental() {
            this.transitionToRoute('/rental/new');
        }
    }
});