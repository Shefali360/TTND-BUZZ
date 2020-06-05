const complaint  = require("../Models/ComplaintModel");
const { ServerError } = require("../../ErrorHandler/generic/genericExceptions");
const { DataValidationFailed } = require("../../ErrorHandler/buzz/buzzExceptions");

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
module.exports.getAllComplaints = async (query, limit, skip) => {
  try {
    const userComplaints = await complaint
      .find(
        query,
        "department issueId lockedBy assignedTo status estimatedTime concern timestamp"
      )
      .sort({
        timestamp: -1,
      })
      .limit(limit ? limit : 0)
      .skip(skip ? skip : 0);
    return userComplaints;
  } catch (err) {
    console.log(err);
    throw new ServerError("Error", 500);
  }
};

module.exports.getComplaintsByUserEmail = async (email, limit, skip) => {
  try {
    const userComplaint = await complaint
      .find(
        {
          email: email,
        },
        "department issueId issue assignedTo status estimatedTime concern"
      ).sort({
        timestamp: -1,
      })
      .limit(limit ? limit : 0)
      .skip(skip ? skip : 0);
    return userComplaint;
  } catch (err) {
    throw new ServerError("Error", 500);
  }
};

module.exports.updateComplaintStatusById = async ({id}, complaintData) => {
  console.log(complaintData)
  try {
  const response=await complaint.findByIdAndUpdate(id, {
    $set: complaintData,
  }, {runValidators: true, new: true}).exec();
    return response;
  } catch (err) {
    if (err.name === "ValidationError")
      throw new DataValidationFailed(err.message, 400);
    else throw new InternalServerError("Error", 500);
  }
};

module.exports.delete= async () => {
  const response = await complaint.deleteMany({});
  return response;
};