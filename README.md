# My Portfolio

A full-stack personal portfolio website built with React, TypeScript, and Node.js. Features an admin panel for managing content, blog posts, projects, and more.

## Features

- **Responsive Design**: Modern, mobile-friendly UI with Tailwind CSS
- **Admin Panel**: Secure authentication and content management
- **Blog System**: Create and manage blog posts
- **Project Showcase**: Display your projects with details
- **Contact Form**: Integrated contact functionality
- **Theme Support**: Light/dark theme toggle
- **Analytics**: Visitor tracking and statistics

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- PostCSS

### Backend
- Node.js
- Express.js
- MongoDB (assumed from models)
- JWT Authentication
- Cloudinary (for image uploads)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my-portfolio
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. Set up environment variables:
   - Create `.env` file in server directory
   - Add required environment variables (database URL, JWT secret, Cloudinary config, etc.)

5. Seed the database (optional):
   ```bash
   cd server
   node seeder.js
   ```

## Usage

1. Start the server:
   ```bash
   cd server
   npm start
   # or for development
   npm run dev
   ```

2. Start the client:
   ```bash
   cd client
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Admin Access

- Navigate to `/admin/login`
- Use admin credentials to log in
- Manage blogs, projects, about section, and zone items

## Project Structure

```
my-portfolio/
├── client/          # React frontend
├── server/          # Node.js backend
├── README.md        # This file
└── ...
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.