import express from 'express';
import { getAllUser,signup,login } from '../controls/users_controls.js';

const router =express.Router();

router.get('/',getAllUser);
router.post("/signup",signup);
router.post('/login',login);

export default router;