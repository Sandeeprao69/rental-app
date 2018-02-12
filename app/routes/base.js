import Ember from 'ember';

export default Ember.Route.extend({
    title: '',

    redirectToLogin: function() {
        return this.transitionTo('sign-up');
    },
});