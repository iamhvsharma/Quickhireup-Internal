import mongoose, { Schema } from "mongoose";

const jobListingSchema = new Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 5000,
  },
  employmentType: {
    type: String, 
    required: true,
    enum: ["Full-time", "Part-time", "Contract", "Internship", "Training"],
    },

  location: {
    type: String,
    required: true,
    trim: true,
  },
  salaryRange: {
    type: String, // Example: "50,000 - 70,000 USD"
    required: false,
    trim: true,
  },
  skillsRequired: [
    {
      type: String,
      trim: true,
      maxlength: 50,
    },
  ],
  experienceRequired: {
    type: String, // Example: "0-2 years", "3-5 years"
    required: true,
  },
  applicationDeadline: {
    type: Date,
    required: false,
  },
}, { timestamps: true });

// Index to ensure a company can't post duplicate job titles
jobListingSchema.index({ companyId: 1, title: 1 }, { unique: true });

const JobListing = mongoose.model("JobListing", jobListingSchema);

export default JobListing;
