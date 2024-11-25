// profile.routes.js
import express from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import Company from '../models/company.model.js';

const router = express.Router();

// Company Profile Route
router.post('/company', authenticate, authorize(['Company']), async (req, res) => {
  try {
    const company = new Company({ ...req.body, userId: req.user.userId });
    await company.save();
    res.status(201).send({ message: 'Company profile created successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;