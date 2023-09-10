import { Router } from "express";
import { signIn,signOut,signUp } from "../controllers/auth/auth.js";

const router=Router()

router.post("/signup",signUp)

router.post("/signin",signIn)

router.put("/signout",signOut)

export default router