import Ember from 'ember';
import UnauthenticatedRoute from '../routes/un-authenticated';
export default UnauthenticatedRoute.extend({
    title: 'Sign ups',
    // action handlers
    actions: {
        signUp() {
            let email = this.controller.get('model.email');
            let password = this.controller.get('model.password');
            let defer = Ember.RSVP.defer();
            this.signup(email, password, defer);
            defer.promise.finally(function() {
                // success or error
                // loginInProgress will be set to false in activate method
                // setting it here makes spinner to stop much before route transition
            });


        },
    },
    model() {
        return Ember.Object.create({
            email: '',
            password: ''
        });
    },

    signup(email, password, defer) {
        let session = this.get('session');
        let self = this;
        session.authenticate(email, password)
            .done((response) => {
                console.log('login success');
                response = response.data;
                let attemptedTransition = session.get('attemptedTransition');

                if (attemptedTransition) {
                    // redirect to last attempted route
                    attemptedTransition.retry();
                    session.set('attemptedTransition', null);
                } else {
                    self.transitionTo('rental');
                }

                defer.resolve();
            }).fail((error) => {
                defer.reject();
            });
    }

});