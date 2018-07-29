'use strict';

const mongoose = require('mongoose');

module.exports = {
  newObjectID: () => {
    return mongoose.Types.ObjectId();
  }
};