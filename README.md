# amarilis-api
This API was created to provide the back-end information for the Amarílis site. It was developed by Matheus Chaves and Natália Nossaka as part of the final project for the web development bootcamp at Ironhack

## Build with
The API was build with:
- Express
- MongoDb: database noSQL
- Jwt: for the authentication features

## Endpoints

| Method | Endpoint | Body | Response | Action
| :---         |     :---:      | :---     | :---     | :---   |
| POST   | /signup     | { username, password, email } | { username, password, email } | Create a new user on the databse |
| POST   | /login    | { username, password } | { username, password } | Generate de token for the routes that need authentication |
| GET    | /verify   | N.A | token | Verify if the user is authenticated |
| GET    | /         | N.A | {user} | Returns all users |
| PUT    | /:userId  | {user} | {user} | Edit the user |
| DELETE | /:userId | {user} | N.A | Delete the user |
| GET    | /         | N.A | {product} | Returns all products |
| GET    | /name/:productName | {name} | {product} | Returns a product by name |
| POST   | /         | {product} | {product} | Create a new product |
| GET    | /:productId | {_id} | {product} | Returns a product by id |
| PUT    | /:productId | {_id} | {product} | Edit a product by id |
| DELETE | /:productId | {_id} | N.A | Delete a product by id |
| GET    | /         | N.A | {categoy} | Returns all categories |
| GET    | /name/:categoryName | {name} | {category} | Returns a category by name |
| POST   | /         | {category} | {category} | Create a new category |
| GET    | /:categoryId | {_id} | {category} | Returns a category by id |
| POST   | /add-category/:categoryName/:productId | {category name} | N.A | Add a product to a category |
| PUT    | /:categoryId | {_id} | {category} | Edit a category by id |
| DELETE | /:categoryId | {_id} | {category} | Delete a category by id |






