import express from 'express';
import {
    addItemShoppingList, createShoppingList, deleteItemShoppingList,
    updateShoppingListStatus, updateShoppingListName, updateItemStatus,
    getShoppingLists,getActiveShopingList
} from '../controllers/shoppingListController.js';
import { checkAuth } from '../middleware/check-auth.js';
const router = express.Router();
// create SHopping List
// POST /api/shopping-list/create ->
router.post('/shopping-list/create',checkAuth,createShoppingList);
// Add items to shopping list: POST /api/shopping-list/add-item -> 
router.post('/shopping-list/add-item',checkAuth,  addItemShoppingList);
// Delete items from list: DELETE /api/shopping-list/delete-item -> 
router.delete('/shopping-list/delete-item',checkAuth,  deleteItemShoppingList);
// update shopping list status: cancel/complete: PUT /api/shopping-list/status -> 
router.put('/shopping-list/status',checkAuth,  updateShoppingListStatus);
// update item status to Done : true /false PUT /api/shopping-list/item-status-> 
router.put('/shopping-list/item-status',checkAuth,  updateItemStatus);
// update the name of the list PUT /api/shopping-list/update-name ->
router.put('/shopping-list/update-name',checkAuth,  updateShoppingListName);
// Get active shopping list: GET /api/shopping-lis/activet ->
router.get('/shopping-list/active', checkAuth, getActiveShopingList);
// Get all shopping lists: GET /api/shopping-lists -> 
router.get('/shopping-lists',checkAuth, getShoppingLists);

export default router;