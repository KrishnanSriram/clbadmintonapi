'use strict';

const express = require('express');
const router = express.Router();
const Location = require('./../models/location');
const Validator = require('./../util/validator');
const Generator = require('./../util/generator');

router.get('/', (req, res, next) => {
  Location.find({})
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          locations: docs
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        })
      });

});

router.get('/:locationId', (req, res, next) => {
  const {locationId} = req.params;

  if (Validator.validObjectID(locationId) === false) {
    return res.status(500).json({
      message: 'Invalid location objectID'
    });
  } else {
    console.log(`${locationId} is a valid location ID`);
  }

  Location.findById(locationId)
      .select('_id name address website contact')
      .exec()
      .then(doc => {
        if (!doc) {
          return res.status(404).json({
            message: `Cannot find any records for ${locationId}`
          });
        }
        res.status(200).json({
          location: doc,
          response: {
            type: 'GET',
            url: `http://localhost:${process.env.PORT}/locations/${locationId}`
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

router.post('/', (req, res, next) => {
  const {name, address, website, contact} = req.body;
  const newLocation = new Location({
    _id: Generator.newObjectID(),
    name,
    address,
    website,
    contact
  });

  newLocation.save()
      .then(doc => {
        res.status(200).json({
          message: 'POST location. Created a new location',
          location: doc,
          request: {
            type: 'GET',
            url: `http://localhost:${process.env.PORT}/locations/${doc._id}`
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });

});

router.delete('/:locationId', (req, res, next) => {
  const {locationId} = req.params;

  if (Validator.validObjectID(locationId) === false) {
    return res.status(500).json({
      message: 'Invalid location objectID'
    });
  }

  return Location.findById(locationId)
      .then(doc => {
        if(doc) {
          console.log('Found a matching record.....proceed to delete');
          return Location.remove({_id: locationId});
        } else {
          const err = new Error(`${locationId} item you wish to delete does not exist!`);
          err.status = 404;
          throw err;
          // return next(err);
        }
      })
      .then(deletedDoc => {
        console.log('Record deleted');
        return res.status(200).json({
          message: `${locationId} is DELETED`,
          deletedDoc
        });
      })
      .catch(err => {
        console.log("Caught error in catch BLOCK", err);
        return res.status(500).json({
          message: `We are having problems deleting this ${locationId}!`
        });
      });
});

module.exports = router;