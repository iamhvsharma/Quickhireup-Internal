// jobListing.routes.js
import express from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import JobListing from "../models/jobListing.model.js";
import Company from "../models/company.model.js";

const router = express.Router();

// Create Job Listing Route
router.post("/job", authenticate, authorize(["Company"]), async (req, res) => {
  try {
    const {
      title,
      description,
      employmentType,
      location,
      salaryRange,
      skillsRequired,
      experienceRequired,
      applicationDeadline,
    } = req.body;
    const company = await Company.findOne({ userId: req.user.userId });
    if (!company) {
      return res.status(404).send({ message: "Company profile not found" });
    }
    const jobListing = new JobListing({
      companyId: company._id,
      userId: req.user.userId,
      title,
      description,
      employmentType,
      location,
      salaryRange,
      skillsRequired,
      experienceRequired,
      applicationDeadline,
    });
    await jobListing.save();
    res.status(201).send({ message: "Job listing created successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get Job Listings for a Company
router.get("/jobs", authenticate, authorize(["Company"]), async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) {
      return res.status(404).send({ message: "Company profile not found" });
    }
    const jobListings = await JobListing.find({ companyId: company._id });
    res.send(jobListings);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
