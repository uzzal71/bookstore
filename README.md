# bookstore
Task: Create a RESTful API for a Bookstore

# Configuration
- Step 1: Create a .env file in root directory
- Step 2: Copy example.env file & paste into .env file
- Step 3: Update .env file like DB_DATABASE, DB_USERNAME, DB_PASSWORD, JWT_SECRET
- Step 4: Import database check root directory "bookstore.sql"
- Step 5: Import postman collection check root directory "Bookstore.postman_collection.json"
- Step 6: install dependencies by following command
```
npm install -g node-gyp
yarn or yarn install
yarn build
yarn dev
```

# Open Browser
[http://localhost:3000/](http://localhost:3000/)

# Warning: All Privates using rules
- Step 1: Generate a token by useing sigin route
- generate token using postman Headers
- Example Authorization = Bearer token

# Routes
### Auth Public Routes
```
Methods: POST
URL: http://localhost:300/signup

Method: POST
URL: http://localhost:300/sigin
```

### Auth Private Routes
```
Methods: GET
URL: http://localhost:300/profile/:id

Methods: PUT
URL: http://localhost:300/profile/:id

Methods: DELETE
URL: http://localhost:300/profile/:id
```

### Author Public Routes
```
Methods: GET
URL: http://localhost:300/authors
Optional: /?page=1&per_page=10

Methods: GET
URL: http://localhost:300/authors/:id

Methods: GET
URL: http://localhost:300/authors/:id/books
Optional: /?page=1&per_page=10
```

### Author Private Routes
```
Methods: POST
URL: http://localhost:300/authors

Methods: PUT
URL: http://localhost:300/authors/:id

Methods: DELETE
URL: http://localhost:300/authors/:id
```

### Book Public Routes
```
Methods: GET
URL: http://localhost:300/books
Optional: /?page=1&per_page=10&title=Abc&author_name=ABC

Methods: GET
URL: http://localhost:300/books/:id

Methods: GET
URL: http://localhost:300/books/author/:id
Optional: /?page=1&per_page=10
```

### Book Private Routes
- Create Book
    - Methods: POST
    - URL: http://localhost:300/books
    - Description: Create a new book.

- Update Book
    - Methods: PUT
    - URL: http://localhost:300/books/:id
    - Description: Update details of a specific book.

- Delete Book
    - Methods: DELETE
    - URL: http://localhost:300/books/:id
    - Description: Delete a specific book.


## Notes
- Ensure that you have a running instance of your database and the correct configurations in the .env file.
- Use the Postman collection for testing the API endpoints.
- Generate a JWT token via the signin route and use it for accessing private routes.