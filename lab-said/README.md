#### Feature Tasks  
* created the app's scaffold including the following directories to organize my code:  
  * `lib`  
  * `model`  
  * `route`  
  * `__test__`  
* created the folowing folders:  
  * `.gitignore`  
  * `.eslintrc.json`  
  * `.eslintignore`  
  * `package.json`  
  * `README.md`  

  * my `README.md` should include detailed instructions on how to use my API  

#### Feature Tasks  
* created a single resource `express` API that can handle **GET**, **POST**, **PUT**, and **DELETE** request  s
* used the `http-errors` module to create new errors and associate them with a proper status code  
* created an `error-middleware` module to handle errors and *use* it in my server file  
* created a `cors-middleware` module that will allow for public use of my API  
* created the `destroy` and `fetchAll` methods and add them to my `storage` module  
  * these methods should be used to delete a resource (`destroy`) and return an array of id's from persisted resource filenames (`fetchAll`)  
* created the `updateNote`, `deleteNote`, and `allNotes` static methods as part of my `Note` model  
* created a series of `note-route-tests` to test my **GET**, **POST**, **PUT**, and **DELETE** routes  

#### status  
* still needs refactoring the test and adding the put test.  
* needs to add the PUT and the DELETE methods.  
