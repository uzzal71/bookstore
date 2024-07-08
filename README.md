# Bookstore RESTful API
A RESTful API for managing a bookstore, including user authentication, author, and book management.

# Configuration
- Step 1: Create a .env file in the root directory
- Step 2: Copy the contents of example.env into the .env file
- tep 3: Update the .env file with your database and JWT configuration:
    - `DB_DATABASE`: Name of your database
    - `DB_USERNAME`: Database username
    - `DB_PASSWORD`: Database password
    - `JWT_SECRET`: Secret key for JWT
- Step 4: Import the database
    - Check the root directory for the `bookstore.sql` file and import it into your database.
- Step 5: Import Postman collection
    - Check the root directory for the `Bookstore.postman_collection.json` file and import it into Postman.
- Step 6: Install dependencies and start the server
```
npm install -g node-gyp
yarn or yarn install
yarn build
yarn dev
```

# Open Browser
Visit [http://localhost:3000/](http://localhost:3000/) to access the application.

# Authentication and Authorization
### Generate a Token
- Use the signin route to generate a token.
- Include the token in the Authorization header for private routes.
- Example: Authorization: Bearer <token>

# Routes
### Auth Public Routes
- Signup
    - Method: POST
    - URL: http://localhost:3000/signup
    - Description: Create a new user account.
- Signin
    - Method: POST
    - URL: http://localhost:3000/signin
    - Description: Authenticate a user and generate a token.

### Auth Private Routes
- Get User Profile
    - Method: GET
    - URL: http://localhost:3000/profile/:id
    - Description: Retrieve the profile of the authenticated user.
- Update User Profile
    - Method: PUT
    - URL: http://localhost:3000/profile/:id
    - Description: Update the profile of the authenticated user.
- Delete User Profile
    - Method: DELETE
    - URL: http://localhost:3000/profile/:id
    - Description: Delete the profile of the authenticated user.

### Author Public Routes
- Get All Authors
    - Method: GET
    - URL: http://localhost:3000/authors
    - Description: Retrieve a list of all authors.
    - Optional Query Params: /?page=1&per_page=10
- Get Author by ID
    - Method: GET
    - URL: http://localhost:3000/authors/:id
    - Description: Retrieve details of a specific author.
- Get Books by Author
    - Method: GET
    - URL: http://localhost:3000/authors/:id/books
    - Description: Retrieve a list of all books written by a specific author.
    - Optional Query Params: /?page=1&per_page=10

### Author Private Routes
- Create Author
    - Method: POST
    - URL: http://localhost:3000/authors
    - Description: Create a new author.
- Update Author
    - Method: PUT
    - URL: http://localhost:3000/authors/:id
    - Description: Update details of a specific author.
- Delete Author
    - Method: DELETE
    - URL: http://localhost:3000/authors/:id
    - Description: Delete a specific author.

### Book Public Routes
- Get All Books
    - Method: GET
    - URL: http://localhost:3000/books
    - Description: Retrieve a list of all books.
    - Optional Query Params: /?page=1&per_page=10&title=Abc&author_name=ABC
- Get Book by ID
    - Method: GET
    - URL: http://localhost:3000/books/:id
    - Description: Retrieve details of a specific book.
- Get Books by Author ID
    - Method: GET
    - URL: http://localhost:3000/books/author/:id
    - Description: Retrieve a list of all books by a specific author.
    - Optional Query Params: /?page=1&per_page=10

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