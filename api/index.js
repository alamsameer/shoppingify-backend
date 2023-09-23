import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import main from '../src/config/db.js';
import categoryRoutes from  '../src/routes/categoryRoute.js'
import itemsRoutes from '../src/routes/itemsRoute.js';
import shoppingListRoutes from '../src/routes/shoppingListRoute.js';
import statisticsRoutes from '../src/routes/statisticRoute.js';
import auth from "../src/routes/auth.js"
const app= express();
// connect to mongodb
main().then(()=>{console.log("connected to mongodb ");}).catch(console.dir);



// Allow requests from all origins and include credentials
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use cookie-parser middleware
app.use(cookieParser());
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the application." });
});

  
// api route
app.use('/api',auth)
app.use('/api',categoryRoutes)
app.use('/api', itemsRoutes);
app.use('/api', shoppingListRoutes);
app.use('/api', statisticsRoutes);

// ... other middleware and server setup ...

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
