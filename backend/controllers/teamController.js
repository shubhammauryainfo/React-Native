const Team = require('../models/Team');

// Create a new team
exports.createTeam = async (req, res) => {
  try {
    const team = new Team({ name: req.body.name, players: [] });
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all teams
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single team by ID
exports.getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update team name
exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a team
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json({ message: 'Team deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add player to team
exports.addPlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const { playerId, name, number } = req.body;

    const team = await Team.findById(id);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    team.players.push({ id: playerId, name, number });
    await team.save();

    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update player
exports.updatePlayer = async (req, res) => {
  try {
    const { id, playerId } = req.params;
    const { name, number } = req.body;

    const team = await Team.findById(id);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    const player = team.players.find((p) => p.id === playerId);
    if (!player) return res.status(404).json({ message: 'Player not found' });

    player.name = name;
    player.number = number;

    await team.save();
    res.json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete player from team
exports.deletePlayer = async (req, res) => {
  try {
    const { id, playerId } = req.params;

    const team = await Team.findById(id);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    team.players = team.players.filter((p) => p.id !== playerId);
    await team.save();

    res.json({ message: 'Player removed', team });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
