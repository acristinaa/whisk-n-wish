# whisk-n-wish
A Sims-inspired personal recipe website  

## Overview  
This is a simple website where I collect and share my favorite recipes. It is styled with a playful nod to *The Sims*, because who wouldn’t love to just type:  

stats.set_skill_level major_cooking 10

...and instantly become a master chef?  

The project was created for my SE_19 class at CODE University and is a recipe collection.  

---

## Pages  
- **Home (`index.html`)** -> Welcome page with navigation.  
- **About (`about.html`)** -> A short intro about me and the purpose of the project.  
- **Seasonal Recipes**  -> A page with the following list of pages:
  - `fall-recipes.html` contains a list of recipes
  - `winter-recipes.html` contains a list of recipes
  - `spring-recipes.html` contains a list of recipes
  - `summer-recipes.html` contains a list of recipes

Each seasonal page displays recipes in styled `<div>` cards, giving it a cookbook-like feel.  

## Updates

Add two more media query.

Add dynamic routing and backend.

## Technical Features

### Frontend
- Responsive design with 3 media queries (500px, 768px, 1024px)
- Accessible HTML with semantic structure
- Client-side JavaScript for dynamic search/filtering
- Form validation with instant feedback

### Backend
- Express.js server with dynamic routing
- EJS templating for server-side rendering
- MongoDB database with Mongoose ODM
- Full CRUD operations for recipes
- RESTful API patterns

---

## Deployment

### Environment Variables Required:
- `MONGODB_URI`: MongoDB connection string (use MongoDB Atlas for production)
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (production/development)

### Security Measures Implemented:
- Environment variables for sensitive data (MongoDB credentials)
- MongoDB connection with authentication
- HTTPS ready for production deployment

### Running Locally:
1. Clone the repository
2. `npm install`
3. Create `.env` file based on `.env.example`
4. Add your MongoDB connection string to `.env`
5. `npm run dev` (development) or `npm start` (production)
6. Visit `http://localhost:3000`

