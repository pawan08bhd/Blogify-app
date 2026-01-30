#Blogify
A clean, functional blogging platform built to handle everything from user thoughts to community discussions. This was built to practice structuring a robust MERN backend while maintaining a seamless user experience.

#Why I built this
I wanted to move beyond basic "to-do" apps and build something that deals with real-world complexities: handling relational data (users/posts/comments), securing routes, and managing dynamic content.

#Key Features
User Accounts: Full registration and login flow with secure authentication.

Write & Share: A simple editor to create, edit, and delete your posts.

Join the Conversation: Built-in commenting system for every blog post.

Dynamic Rendering: Uses EJS templates to serve content quickly and efficiently.

#Tech Stack
The Core: MongoDB, Express.js, React, Node.js.

Frontend: Tailwind CSS for styling and EJS for view rendering.

State & Auth: JWT for sessions and Context API for managing state.

# Getting Started
Clone it:

Bash
git clonehttps://github.com/pawan08bhd/Blogify-app.git
Set up the environment: Create a .env file in the root and add your MONGO_URI and JWT_SECRET.

Install & Run:

Bash
npm install
npm run dev
# What's Next?
[ ] Adding image upload support (Cloudinary).

[ ] Implementing a "Like" feature for posts.

[ ] Adding a search bar to filter blogs by tags.


🔐 Authentication Flow
The app uses a secure, industry-standard approach to manage user sessions. Here is a breakdown of how it works:

Password Hashing: When a user signs up, their password is encrypted using bcrypt before being stored in MongoDB. We never store plain-text passwords.

JWT Issuance: Upon a successful login, the server generates a JSON Web Token (JWT). This token contains the user's unique ID and an expiration timestamp.

Protected Routes: For actions like creating a post or deleting a comment, the backend checks for the JWT in the request headers. If the token is valid and hasn't expired, the request proceeds; otherwise, it is blocked.

Middleware: A custom auth middleware sits between the request and the controller to verify the user's identity on every sensitive operation.

⚙️ Backend Logic Example
The logic is structured to separate concerns, keeping the routes clean and the controllers focused on the business logic:

Middleware: Validates the token.

Controller: Processes the data and interacts with the Database.

Model: Defines the structure (Schema) for Users, Posts, and Comments.

🛡️ Auth Middleware Implementation
This middleware ensures that only authenticated users can access specific routes. It extracts the token from the header, verifies it, and attaches the user data to the request object.
