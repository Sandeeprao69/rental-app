import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        createRental(title) {
            var title = this.get('store').createRecord('rental', { title: title });
            title.save();
            this.transitionTo('rental');
        }
    }
})