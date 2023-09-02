import express from "express";
import { getTopItems,getTopCategories,getcategoriesWithinInterval} from "../controllers/statisticContoller.js";

const router = express.Router();
// Get top items: GET /api/statistics/top-items -> 
router.get("/top-items", getTopItems);
// Get top categories: GET /api/statistics/top-categories -> 
router.get("/top-categories", getTopCategories);
// Get monthly status: GET /api/statistics/specified-status -> 

router.post("/time-interval",getcategoriesWithinInterval)


export default router;