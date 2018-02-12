import Ember from 'ember';

export default Ember.Service.extend({
    isAuthenticated: false,
    init: function() {
        this._super(...arguments);
        let token = localStorage.getItem('token');
        if (token) {
            this.set('isAuthenticated', true);
            // pass token and vendor toekn in all ajax calls
            this.setupRequestHeaders(token);
        } else {
            this.set('isAuthenticated', false);
        }
    },
    /**
     * authenticate user.
     * If success save tokens and setup request headers.
     */
    authenticate: function(email, password) {
        let self = this;
        let data = {
            email: email,
            password: password,
        };
        return Ember.$.ajax({
            type: 'POST',
            url: '/api/logIn',
            contentType: 'application/json',
            data: JSON.stringify(data)
        }).done(function(response) {
            Ember.Logger.log('authentication success');
            let token = response.token;
            self.setupRequestHeaders(token);
            self.set('isAuthenticated', true);
            // save token in LS
            localStorage.setItem('token', JSON.stringify(token));

            return response;
        }).fail(function(error) {
            Ember.Logger.log('authentication failed');
            self.set('isAuthenticated', false);
            self.setupRequestHeaders('', '');
            self.clear();
            return error;
        });
    },
    setupRequestHeaders(token) {
        // pass token and vendor token in all ajax calls
        Ember.$.ajaxSetup({
            headers: {
                'authorization': token.jwt,
            }
        });
    },
});