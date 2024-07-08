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
[http://localhost:3000/](http://localhost:3000/){:target="_blank"}

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
```
Methods: POST
URL: http://localhost:300/books

Methods: PUT
URL: http://localhost:300/books/:id

Methods: DELETE
URL: http://localhost:300/books/:id
```