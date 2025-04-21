const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// Team routes
router.post('/', teamController.createTeam);
router.get('/', teamController.getTeams);
router.get('/:id', teamController.getTeam);
router.put('/:id', teamController.updateTeam);
router.delete('/:id', teamController.deleteTeam);

// Player routes (nested under team)
router.post('/:id/players', teamController.addPlayer);
router.put('/:id/players/:playerId', teamController.updatePlayer);
router.delete('/:id/players/:playerId', teamController.deletePlayer);

module.exports = router;
