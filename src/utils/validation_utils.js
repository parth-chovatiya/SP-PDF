const { ObjectId } = require("mongodb");

// validate objectId
exports.isValidObjectId = (ownerId) =>
  ObjectId.isValid(ownerId) && String(new ObjectId(ownerId)) === ownerId;
