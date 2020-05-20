const { admin } = require("./model");
const { ServerError } = require("../ErrorHandler/genericExceptions");
const { DataValidationFailed } = require("../ErrorHandler/buzzExceptions");

module.exports.createAdmin = async (data) => {
  const adminRole = new admin(data);
  try {
    await adminRole.save();
    return adminRole;
  } catch (err) {
    if (err.name === "ValidationError") {
      throw new DataValidationFailed(err.message, 400);
    } else {
      throw new ServerError("Error", 500);
    }
  }
};

module.exports.getAdmin = async (email) => {
  const adminPresent = await admin.findOne({ email: email });
  if (adminPresent !== null){ return true;}
  else{ return false;}
};

module.exports.delete = async ({ id }) => {
  const response = await admin.deleteOne({
    _id: id,
  });
  return response;
};
