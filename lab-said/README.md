## Requirements

#### Configuration
* `package.json`
* `.eslintrc.json`
* `.eslintignore`
* `.gitignore`
* `README.md`
  * my `README.md` should include detailed instructions on how to use my API

#### Feature Tasks
* created a single resource `express` API that can handle **GET**, **POST**, **PUT**, and **DELETE** requests
* use the `http-errors` module to create new errors and associate them with a proper status code
* created an `error-middleware` module to handle errors and *use* it in my server file
* created a `cors-middleware` module that will allow for public use of my API
* created the `destroy` and `fetchAll` methods and add them to my `storage` module
  * these methods should be used to delete a resource (`destroy`) and return an array of id's from persisted resource filenames (`fetchAll`)
* created the `updateNote`, `deleteNote`, and `allNotes` static methods as part of my `Note` model
* created a series of `note-route-tests` to test my **GET**, **POST**, **PUT**, and **DELETE** routes
  * **hint:** *you'll want to use the `beforeAll` or `beforeEach` and `afterAll` or `afterEach` hooks provided by `jest` in order to created a test note and delete the note after the test has completed*
