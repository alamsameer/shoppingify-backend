import express from 'express';
import {
    addItemShoppingList, createShoppingList, deleteItemShoppingList, updateShoppingListStatus, updateShoppingListName, updateItemStatus,getShoppingLists
} from '../controllers/shoppingListController.js';
const router = express.Router();
// create SHopping List
// POST /api/shopping-list/create ->
router.post('/shopping-list/create', createShoppingList);
// Add items to shopping list: POST /api/shopping-list/add-item -> 
router.post('/shopping-list/add-item', addItemShoppingList);
// Delete items from list: DELETE /api/shopping-list/delete-item -> 
router.delete('/shopping-list/delete-item', deleteItemShoppingList);
// update shopping list status: cancel/complete: PUT /api/shopping-list/status -> 
router.put('/shopping-list/status', updateShoppingListStatus);
// update item status to Done : true /false PUT /api/shopping-list/item-status-> 
router.put('/shopping-list/item-status', updateItemStatus);
// update the name of the list PUT /api/shopping-list/update-name ->
router.put('/shopping-list/update-name', updateShoppingListName);
// Get all shopping lists: GET /api/shopping-lists -> 
router.get('/shopping-lists', getShoppingLists);

export default router;