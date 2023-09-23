import { Router } from 'express';
import { addCategory, getAllCategories} from '../controllers/categoryController.js';
const router=Router();
// Add category 
router.post('/add-category',addCategory)
// Get all  category: GET /api/category
router.get('/categories',getAllCategories)
// Get all items category-wise: GET /api/items/:categoryId


export default router