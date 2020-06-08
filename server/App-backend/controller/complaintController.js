const customId = require("custom-id");
const complaintService = require("../services/complaintServices");

module.exports.createComplaint = async (req, res, next) => {
  const myuserdata = req.data;
  req.body.email = myuserdata.data.email;
  req.body.name = myuserdata.data.name;
  req.body.assignedTo = myuserdata.data.name;
  req.body.lockedBy = myuserdata.data.name;
  const issueId = customId({
    email: myuserdata.data.email,
    randomLength: 2,
  });
  req.body.issueId = issueId;
  const paths = [];
  if (req.files) {
    req.files.forEach((path) => {
      paths.push(path.path);
    });
  }
  req.body.files = paths;
  try {
    const response = await complaintService.createComplaint(req.body);
    res.send(response);
  } catch (err) {
    next(err);
  }
};

module.exports.getAllComplaints = async (req, res, next) => {
  const limitCount = req.query.limit;
  delete req.query.limit;
  const skipCount = req.query.skip;
  delete req.query.skip;
  try {
    const response = await complaintService.getAllComplaints(
      req.query,
      Number(limitCount),Number(skipCount)
    );
    res.send(response);
  } catch (err) {
    next(err);
  }
};
module.exports.getComplaintsByUserEmail = async (req, res, next) => {
  const userEmail = req.data.data.email;
  req.query["email"]=userEmail;
  const limitCount = req.query.limit;
  delete req.query.limit;
  const skipCount = req.query.skip;
  delete req.query.skip;
  try {
    const response = await complaintService.getComplaintsByUserEmail(
      req.query,
      Number(limitCount),Number(skipCount)
    );
    res.send(response);
  } catch (err) {
    next(err);
  }
};

module.exports.updateComplaintStatusById = async (req, res,next) => {
  try {
    const response = await complaintService.updateComplaintStatusById(req.params,req.body);
    res.send(response);
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async (req, res) => {
  try {
    const response = await complaintService.delete();
    res.send(response);
    
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.handleUnknownRequests = (req, res, next) => {
  return next(new ResourceNotFound("requested resource not found", 404));
};
