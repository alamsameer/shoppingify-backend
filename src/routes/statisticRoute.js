import express from "express";
import { getTopItems,getTopCategories,getcategoriesWithinInterval} from "../controllers/statisticContoller.js";
import { checkAuth } from "../middleware/check-auth.js";


const router = express.Router();
// Get top items: GET /api/statistics/top-items -> 
router.get("/top-items",checkAuth, getTopItems);
// Get top categories: GET /api/statistics/top-categories -> 
router.get("/top-categories", checkAuth,getTopCategories);
// Get monthly status: GET /api/statistics/specified-status -> 

router.post("/time-interval",checkAuth,getcategoriesWithinInterval)


export default router;