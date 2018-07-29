'use strict';

const mongoose = require('mongoose');

module.exports = {
  validObjectID: (objectID) => {
    return mongoose.Types.ObjectId.isValid(objectID);
  }
};