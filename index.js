import express from 'express';
import main from './src/config/db.js';
import categoryRoutes from  './src/routes/categoryRoute.js'
import itemsRoutes from './src/routes/itemsRoute.js';
import shoppingListRoutes from './src/routes/shoppingListRoute.js';


const app = express();
// connect to mongodb
main().then(()=>{console.log("connected to mongodb ");}).catch(console.dir);


// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes


app.use('/api',categoryRoutes)
app.use('/api', itemsRoutes);
app.use('/api', shoppingListRoutes);

// ... other middleware and server setup ...

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
