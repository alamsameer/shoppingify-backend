
import express from 'express';
import { getAllItemsCategory,addItems,getItemDetails,getItemsByPage,getAllItems } from "../controllers/itemsController.js";

const router = express.Router();
// get all items 
router.get('/items', getAllItems);
// Get all items category-wise: GET /api/items/:categoryId
router.get('/items/:categoryId', getAllItemsCategory);

// get individual item details
router.get('/item/:itemId', getItemDetails);

// get all items page wise
router.get('/items', getItemsByPage);

// Add item to items model/db
router.post('/add-item', addItems);

export default router;