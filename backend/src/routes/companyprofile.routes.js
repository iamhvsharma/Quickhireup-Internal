// company.routes.js
import express from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import Company from '../models/company.model.js';

const router = express.Router();

// Create Company Profile Route
router.post('/company', authenticate, authorize(['Company']), async (req, res) => {
  try {
    const company = new Company({ ...req.body, userId: req.user.userId });
    await company.save();
    res.status(201).send({ message: 'Company profile created successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get Company Profile Route
router.get('/company/:id', authenticate, authorize(['Company']), async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).send({ message: 'Company not found' });
    }
    res.send(company);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;