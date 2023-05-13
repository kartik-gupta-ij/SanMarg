<div align="center">
  <h1>🏕️ SanMarg 🌲</h1>

</div>

<div align="center">
  <h2>- Development Process -</h2>
</div>

<div align="center">
  <h3>https://sanmarg.onrender.com</h3>
</div>

## Initial Setup

- [x] Add Landing Page
- [x] Add Issues Page that lists all Issues

## Each Issue has:

- [x] Name
- [x] Image

## Layout and Basic Styling

- [x] Create our header and footer partials
- [x] Add in Bootstrap

## Creating New Issues

- [x] Setup new Issue POST route
- [x] Add in body-parser
- [x] Setup route to show form
- [x] Add basic unstyled form

## Style the Issues page

- [x] Add a better header/title
- [x] Make Issues display in a grid

## Style the Navbar and Form

- [x] Add a navbar to all templates
- [x] Style the new Issue form

## Add Mongoose

- [x] Install and configure Mongoose
- [x] Setup Issue model
- [x] Use Issue model inside of our routes

## Show Page

- [x] Review the RESTful routes we've seen so far
- [x] Add description to our Issue model
- [x] Show db.collection.drop()
- [x] Add a show route/template

## Refactor Mongoose Code

- [x] Create a models directory
- [x] Use module.exports
- [x] Require everything correctly
    
## Add Seeds File

- [x] Add a seeds.js file
- [x] Run the seeds file every time the server starts

## Add the Comment model

- [x] Make our errors go away
- [x] Display comments on Issue show page

## Comment New/Create

- [x] Discuss nested routes
- [x] Add the comment new and create routes
- [x] Add the new comment form

## Style Show Page

- [x] Add sidebar to show page
- [x] Display comments nicely

## Finish Styling Show Page

- [x] Add public directory
- [x] Add custom stylesheet

## Auth Pt. 1 - Add User Model

- [x] Install all packages needed for auth
- [x] Define User model

## Auth Pt. 2 - Register

- [x] Cconfigure Passport
- [x] Add register routes
- [x] Add register template

## Auth Pt. 3 - Login

- [x] Add login routes
- [x] Add login template

## Auth Pt. 4 - Logout/Navbar

- [x] Add logout route
- [x] Prevent user from adding a comment if not signed in
- [x] Add links to navbar

## Auth Pt. 5 - Show/Hide Links

- [x] Show/hide auth links in navbar

## Refactor The Routes

- [x] Use Express router to reoragnize all routes

## Users + Comments

- [x] Associate users and comments
- [x] Save author's name to a comment automatically

## Users + Issues

- [x] Prevent an unauthenticated user from creating a Issue
- [x] Save username + id to newly created Issue

## Editing Issues

- [x] Add method override
- [x] Add edit route for Issues
- [x] Add link to edit page
- [x] Add update route

## Deleting Issues

- [x] Add destroy route
- [x] Add delete button

## Authorization (permission)

- [x] User can only edit his/her Issues
- [x] User can only delete his/her Issues
- [x] Hide/Show edit and delete buttons

## Editing comments

- [x] Add edit route for comments
- [x] Add edit template
- [x] Add edit button
- [x] Add update route

## Deleting comments

- [x] Add destroy route
- [x] Add delete button

## Authorization part 2: Comments

- [x] User can only edit his/her comments
- [x] User can only delete his/her comments
- [x] Hide/Show edit and delete buttons
- [x] Refactor middleware

## Adding in flash

- [x] Demo working version
- [x] Install and configure connect-flash
- [x] Add bootstrap alerts to header


# Features

- Responsive web design (RWD)
- User authentication (Login/Register/Logout) and authorization (Post/Like/Edit)
- Flash messages responding to users' interaction
- Refactored with ES6 and ES7 syntax (eg: async/await)
- RESTful API

```
-------------------------------------------------------------------------
Normal Routes
-------------------------------------------------------------------------
[Method]  [Route]
GET       /                       Landing page
GET       /login                  Request the user login page
GET       /register               Request the user edit page

-------------------------------------------------------------------------
Users Route
-------------------------------------------------------------------------
[Method]  [Route]
GET       /users                  Fetch all users
POST      /users                  Create new user in database
GET       /users/new              Request the user register page
GET       /users/:id              Show the user information
PATCH     /users/:id              Update user information
DELETE    /users/:id              Delete user information
GET       /users/:id/edit         Request the user edit page

-------------------------------------------------------------------------
Sessions Route
-------------------------------------------------------------------------
[Method]  [Route]
POST      /sessions               Create a session (user login)
GET       /sessions/login         Request the user login page
DELETE    /sessions               Delete a session (user logout)

-------------------------------------------------------------------------
Issues Route
-------------------------------------------------------------------------
[Method]  [Route]
GET       /issues            Fetch all Issues
POST      /issues            Create a new Issue to database
GET       /issues/new        Request the Issue adding page
GET       /issues/:id        Show the Issue information
PUT       /issues/:id        Update Issue information (all)
PATCH     /issues/:id        Update Issue information (part)
DELETE    /issues/:id        Delete a Issue
GET       /issues/:id/edit   Request the Issue editing page
POST      /issues/:id/likes  Like the Issue

-------------------------------------------------------------------------
Comments Route
-------------------------------------------------------------------------
[Method]  [Route]
POST      /issues/:id/comments       Create a new comment
PATCH     /issues/:id/comments/:cid  Update comment
DELETE    /issues/:id/comments/:cid  Delete comment
```

# Technologies

## Frontend

- [Bootstrap](https://getbootstrap.com/)
- [ejs](https://ejs.co/)

## Backend

- [express](https://gulpjs.com/)
- [mongodb](https://webpack.js.org/concepts/)

Check [`package.json`](https://github.com/kartik-gupta-ij/SanMarg7267/blob/master/package.json) file for more information.

# Getting Started

Follow the instructions below to set up the environment and run this project on your local machine.

1. Clone this repository.

```bash
# Clone repository
$ git clone https://github.com/kartik-gupta-ij/SanMarg.git
```

2. Install dependencies via NPM or Yarn

```bash
# Install dependencies via npm
$ npm install

# Install dependencies via yarn
$ yarn install
```

3. Setup `.env` file using `example.env`

4. Run the server with [nodemon](https://nodemon.io/) and open a browser to visit [http://localhost:3000/](http://localhost:3000/).

```bash
# Run server
$ npm run start
```
