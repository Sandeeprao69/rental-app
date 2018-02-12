export default function() {

    // These comments are here to help you get started. Feel free to delete them.

    /*
      Config (with defaults).

      Note: these only affect routes defined *after* them!
    */

    // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
    // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
    // this.timing = 400;      // delay for each request, automatically set to 0 during testing

    /*
      Shorthand cheatsheet:

      this.get('/posts');
      this.post('/posts');
      this.get('/posts/:id');
      this.put('/posts/:id'); // or this.patch
      this.del('/posts/:id');

      http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
    */

    this.urlPrefix = 'http://localhost:4200';
    //Login API stub
    this.post('/api/logIn', (schema, request) => {
        var params = JSON.parse(request.requestBody);

        if (!params.email) {
            return new Response(403, { some: 'header', 'Content-Type': 'application/json' }, {
                errors: [{
                    status: 403,
                    title: 'email is invalid',
                    description: 'email cannot be blank'
                }]
            });
        } else {
            var user = schema.users.create(params);
            return {
                user: user,
                token: {
                    jwt: "JWT"
                }
            }
        }

    });

    this.get('/api/rentals', (schema, request) => {
        return schema.rentals.all();
    });

    this.post('/api/rentals', (schema, request) => {
        var params = JSON.parse(request.requestBody);

        if (!params.rental.title) {
            return new Response(403, { some: 'header', 'Content-Type': 'application/json' }, {
                errors: [{
                    status: 403,
                    title: 'title is invalid',
                    description: 'title cannot be blank'
                }]
            });
        } else {
            params.rental.id = parseInt(Math.random() * 10000)
            var rental = schema.rentals.create(params.rental);
            return {
                rental: rental
            }

        }

    });
}