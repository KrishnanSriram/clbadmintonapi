'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Players list invoked'
  });
});

router.get('/:playerId', (req, res, next) => {
  const { playerId } = req.params;
  res.status(200).json({
    message: `Player list invoked for player ID ${playerId}`
  });
});

router.post('/', (req, res, next) => {
  const newleague = {
    playerId:'someid',
    league: req.body.leagueId,
    first_name: req.body.first_name,
    last_name: req.body_last_name,
    email: req.body.email,
    mobile: req.body.mobile
  };
  res.status(200).json({
    message: 'POST player. Created a player',
    league: newleague,
    request: {
      type: 'GET',
      url: `http://localhost:${process.env.PORT}/players/${newleague.playerId}`
    }
  });
});

router.delete('/:playerId', (req, res, next) => {
  const { playerId } = req.params;
  res.status(200).json({
    message: `Delete player information for playerId ${playerId}`
  });
});

router.patch('/:playerId', (req, res, next) => {
  const { playerId } = req.params;
  res.status(200).json({
    message: `player UPDATE invoked for player ID ${playerId}`
  });
});

module.exports = router;