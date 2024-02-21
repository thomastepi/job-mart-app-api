const Job = require("../models/jobModel");

async function createJob(req, res) {
  const { position, company, location, jobType, status } = req.body;
  const newJob = new Job({ position, company, location, jobType, status });
  newJob
    .save()
    .then((job) => {
      res.status(201).send(job);
    })
    .catch((err) => {
      console.error("Error: ", err);
      res.status(500).send("Internal server error");
    });
}

const ITEMS_PER_PAGE = 10;

async function getJobs(req, res) {
  const page = +req.query.page || 1;
  try {
    const totalJobs = await Job.find().countDocuments();
    const numOfPages = Math.ceil(totalJobs / ITEMS_PER_PAGE);
    const jobs = await Job.find()
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
    res.status(200).send({ jobs, totalJobs, numOfPages });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).send("Internal server error");
  }
}

async function deleteJob(req, res) {
  const { id } = req.params;
  try {
    await Job.findByIdAndDelete(id);
    res.status(200).send("Job deleted");
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).send("Internal server error");
  }
}

async function updateJob(req, res) {
  const { id } = req.params;
  const { position, company, location, jobType, status } = req.body;
  try {
    const job = await Job.findByIdAndUpdate(
      id,
      { position, company, location, jobType, status },
      { new: true }
    );
    res.status(200).send(job);
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).send("Internal server error");
  }
}

async function getJobStats(req, res) {
  try {
    const defaultStats = await Job.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const formattedDefaultStats = defaultStats.reduce((acc, stat) => {
        acc[stat._id.toLowerCase()] = stat.count;
        return acc;
      }, {});

    const monthlyApplications = await Job.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%m %Y", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedMonthlyApplications = monthlyApplications.map((app) => ({
        date: app._id,
        count: app.count,
      }));

    res.status(200).send({ defaultStats: formattedDefaultStats, monthlyApplications: formattedMonthlyApplications });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).send("Internal server error");
  }
}

module.exports = { createJob, getJobs, deleteJob, updateJob, getJobStats };
