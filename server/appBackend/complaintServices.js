const { complaint } = require("./model");
const { ServerError } = require("../ErrorHandler/genericExceptions");
const { DataValidationFailed } = require("../ErrorHandler/buzzExceptions");

module.exports.createComplaint = async (data) => {
  const complaintData = new complaint(data);
  try {
    await complaintData.save();
    return complaintData;
  } catch (err) {
    if (err.name === "ValidationError") {
      throw new DataValidationFailed(err.message, 400);
    } else {
      throw new ServerError("Error", 500);
    }
  }
};
module.exports.getAllComplaints = async (limit, skip) => {
  try {
    const userComplaints = await complaint
      .find(
        {},
        "department issueId lockedBy assignedTo status estimatedTime concern"
      )
      .limit(limit ? limit : 0)
      .skip(skip ? skip : 0);
    return userComplaints;
  } catch (err) {
    throw new ServerError("Error", 500);
  }
};

module.exports.getComplaintsByUserEmail = async (email, limit, skip) => {
  try {
    const userComplaint = await complaint
      .find(
        { email: email },
        "department issueId assignedTo status estimatedTime concern"
      )
      .limit(limit ? limit : 0)
      .skip(skip ? skip : 0);
    return userComplaint;
  } catch (err) {
    throw new ServerError("Error", 500);
  }
};
