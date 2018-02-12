import Ember from 'ember';
import BaseRoute from '../routes/base';
export default BaseRoute.extend({
    //In case user is already logged in and trying to login again
    beforeModel(transition) {
        this._super(...arguments);
        if (this.get('session').get('isAuthenticated')) {
            transition.abort();
            this.redirectToRentalPage();
        }
    },

    redirectToRentalPage: function() {
        return this.transitionTo('rental');
    }
});