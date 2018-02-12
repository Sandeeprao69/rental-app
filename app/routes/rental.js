import Ember from 'ember';
import AuthenticatedRoute from '../routes/authenticated';

export default AuthenticatedRoute.extend({
    model() {
        return this.store.findAll('rental');
    }
});