import express from 'express';
import main from './src/config/db.js';
import categoryRouter from  './src/routes/categoryRoute.js'
import itemsRouter from './src/routes/itemsRoute.js';




const app = express();
// connect to mongodb
main().then(()=>{console.log("connected to mongodb ");}).catch(console.dir);


// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes


app.use('/api',categoryRouter)
app.use('/api', itemsRouter);
// app.use('/api', shoppingListRoutes);

// ... other middleware and server setup ...

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
