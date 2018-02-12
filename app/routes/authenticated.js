import Ember from 'ember';
import BaseRoute from '../routes/base';

export default BaseRoute.extend({
    /*
     * checks if user is authenticated.
     * if not, redirects back to login page
     */
    beforeModel(transition) {
        this._super(...arguments);
        // save attempted transition
        this.get('session').set('attemptedTransition', transition);
        if (!this.get('session.isAuthenticated')) {
            transition.abort();
            this.redirectToLogin();
        }
    },

    redirectToLogin: function() {
        window.location.href = "/sign-up"
    }

});