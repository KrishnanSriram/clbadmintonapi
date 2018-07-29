'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Leagues list invoked'
  });
});

router.get('/:leagueId', (req, res, next) => {
  const { leagueId } = req.params;
  res.status(200).json({
    message: `Leagues list invoked for league ID ${leagueId}`
  });
});

router.post('/', (req, res, next) => {
  const newleague = {
    leagueId:'someid',
    group:req.body.group,
    description: req.body.description,
    location: req.body.locationId,
  };
  res.status(200).json({
    message: 'POST league. Created a league',
    league: newleague,
    request: {
      type: 'GET',
      url: `http://localhost:${process.env.PORT}/leagues/${newleague.leagueId}`
    }
  });
});

router.delete('/:leagueId', (req, res, next) => {
  const { leagueId } = req.params;
  res.status(200).json({
    message: `Delete league information for leagueId ${leagueId}`
  });
});

router.patch('/:leagueId', (req, res, next) => {
  const { leagueId } = req.params;
  res.status(200).json({
    message: `Leagues UPDATE invoked for league ID ${leagueId}`
  });
});

module.exports = router;