
import express from 'express';
import { getAllItemsCategory,addItems,getItemDetails,getItemsByPage } from "../controllers/itemsController.js";

const router = express.Router();

// Get all items category-wise: GET /api/items/:categoryId
router.get('/items/:categoryId', getAllItemsCategory);

// get individual item details
router.get('/item/:itemId', getItemDetails);

// get all items page wise
router.get('/items', getItemsByPage);

// Add item to items model/db
router.post('/add-item', addItems);

export default router;