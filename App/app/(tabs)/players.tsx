import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
} from 'react-native';

type Player = {
  id: string;
  name: string;
  number: string;
};

type Team = {
  id: string;
  name: string;
  players: Player[];
};

export default function TeamsScreen() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const [teamNameInput, setTeamNameInput] = useState('');
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);

  const [playerName, setPlayerName] = useState('');
  const [playerNumber, setPlayerNumber] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);

  const resetPlayerForm = () => {
    setPlayerName('');
    setPlayerNumber('');
    setPlayerId('');
    setEditingPlayerId(null);
  };

  const resetTeamForm = () => {
    setTeamNameInput('');
    setEditingTeamId(null);
  };

  const handleCreateOrUpdateTeam = () => {
    if (!teamNameInput.trim()) {
      alert('Please enter a team name');
      return;
    }

    if (editingTeamId) {
      setTeams((prev) =>
        prev.map((team) =>
          team.id === editingTeamId ? { ...team, name: teamNameInput } : team
        )
      );
    } else {
      const newTeam: Team = {
        id: Date.now().toString(),
        name: teamNameInput,
        players: [],
      };
      setTeams([...teams, newTeam]);
      setSelectedTeamId(newTeam.id);
    }

    resetTeamForm();
  };

  const handleDeleteTeam = (teamId: string) => {
    Alert.alert('Delete Team', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setTeams((prev) => prev.filter((t) => t.id !== teamId));
          if (selectedTeamId === teamId) {
            setSelectedTeamId(null);
            resetPlayerForm();
          }
          resetTeamForm();
        },
      },
    ]);
  };

  const selectedTeam = teams.find((team) => team.id === selectedTeamId);
  const players = selectedTeam?.players ?? [];

  const handleAddOrUpdatePlayer = () => {
    if (!playerName || !playerNumber || !playerId) {
      alert('Fill all player fields');
      return;
    }
    if (!selectedTeam) return;

    const updatedPlayers = editingPlayerId
      ? players.map((p) =>
          p.id === editingPlayerId
            ? { id: playerId, name: playerName, number: playerNumber }
            : p
        )
      : [...players, { id: playerId, name: playerName, number: playerNumber }];

    setTeams((prev) =>
      prev.map((team) =>
        team.id === selectedTeam.id ? { ...team, players: updatedPlayers } : team
      )
    );

    resetPlayerForm();
  };

  const handleEditPlayer = (player: Player) => {
    setPlayerName(player.name);
    setPlayerNumber(player.number);
    setPlayerId(player.id);
    setEditingPlayerId(player.id);
  };

  const handleDeletePlayer = (id: string) => {
    if (!selectedTeam) return;

    Alert.alert('Delete Player', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updated = players.filter((p) => p.id !== id);
          setTeams((prev) =>
            prev.map((team) =>
              team.id === selectedTeam.id ? { ...team, players: updated } : team
            )
          );
          resetPlayerForm();
        },
      },
    ]);
  };

  const handleEditTeam = (team: Team) => {
    setTeamNameInput(team.name);
    setEditingTeamId(team.id);
  };

  const renderPlayerRow = ({ item }: { item: Player }) => (
    <View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center' }}>
      <Text style={{ flex: 1, color: '#374151' }}>{item.name}</Text>
      <Text style={{ flex: 1, color: '#374151' }}>{item.number}</Text>
      <Text style={{ flex: 1, color: '#374151' }}>{item.id}</Text>
      <View style={{ flexDirection: 'row', width: 80 }}>
        <TouchableOpacity
          onPress={() => handleEditPlayer(item)}
          style={{ backgroundColor: '#10b981', padding: 6, borderRadius: 4, marginRight: 4 }}
        >
          <Text style={{ color: '#fff', fontSize: 12 }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeletePlayer(item.id)}
          style={{ backgroundColor: '#ef4444', padding: 6, borderRadius: 4 }}
        >
          <Text style={{ color: '#fff', fontSize: 12 }}>Del</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb', padding: 20 }}>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={renderPlayerRow}
        ListHeaderComponent={
          <View>
            {/* Team Create / Edit */}
            <View style={{ marginBottom: 20, backgroundColor: '#fff', padding: 20, borderRadius: 12 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' }}>
                {editingTeamId ? 'Edit Team Name' : 'Create New Team'}
              </Text>
              <TextInput
                placeholder="Enter Team Name"
                value={teamNameInput}
                onChangeText={setTeamNameInput}
                style={{
                  backgroundColor: '#f3f4f6',
                  padding: 14,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  marginBottom: 12,
                }}
              />
              <TouchableOpacity
                onPress={handleCreateOrUpdateTeam}
                style={{
                  backgroundColor: editingTeamId ? '#f59e0b' : '#2563eb',
                  padding: 14,
                  borderRadius: 8,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  {editingTeamId ? 'Update Team' : 'Create Team'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Team List */}
            {teams.length > 0 && (
              <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' }}>
                  Select a Team
                </Text>
                {teams.map((team) => (
                  <View key={team.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <TouchableOpacity
                      onPress={() => setSelectedTeamId(team.id)}
                      style={{
                        flex: 1,
                        backgroundColor: selectedTeamId === team.id ? '#2563eb' : '#f3f4f6',
                        padding: 12,
                        borderRadius: 8,
                        alignItems: 'center',
                        marginRight: 8,
                      }}
                    >
                      <Text style={{ fontWeight: 'bold', color: selectedTeamId === team.id ? '#fff' : '#111827' }}>
                        {team.name}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleEditTeam(team)}
                      style={{ backgroundColor: '#10b981', padding: 8, borderRadius: 4, marginRight: 4 }}
                    >
                      <Text style={{ color: '#fff', fontSize: 12 }}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteTeam(team.id)}
                      style={{ backgroundColor: '#ef4444', padding: 8, borderRadius: 4 }}
                    >
                      <Text style={{ color: '#fff', fontSize: 12 }}>Del</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Player Form */}
            {selectedTeam && (
              <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' }}>
                  {editingPlayerId ? 'Edit Player' : 'Add Player'}
                </Text>
                <TextInput
                  placeholder="Player Name"
                  value={playerName}
                  onChangeText={setPlayerName}
                  style={{
                    backgroundColor: '#f3f4f6',
                    padding: 14,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#d1d5db',
                    marginBottom: 12,
                  }}
                />
                <TextInput
                  placeholder="Player Number"
                  value={playerNumber}
                  onChangeText={setPlayerNumber}
                  keyboardType="numeric"
                  style={{
                    backgroundColor: '#f3f4f6',
                    padding: 14,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#d1d5db',
                    marginBottom: 12,
                  }}
                />
                <TextInput
                  placeholder="Player ID"
                  value={playerId}
                  onChangeText={setPlayerId}
                  style={{
                    backgroundColor: '#f3f4f6',
                    padding: 14,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#d1d5db',
                    marginBottom: 16,
                  }}
                />
                <TouchableOpacity
                  onPress={handleAddOrUpdatePlayer}
                  style={{
                    backgroundColor: editingPlayerId ? '#f59e0b' : '#2563eb',
                    padding: 14,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    {editingPlayerId ? 'Update Player' : 'Add Player'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Table Header */}
            {players.length > 0 && (
              <View style={{ flexDirection: 'row', marginBottom: 8, borderBottomWidth: 1, borderColor: '#d1d5db', paddingBottom: 6 }}>
                <Text style={{ flex: 1, fontWeight: 'bold', color: '#374151' }}>Name</Text>
                <Text style={{ flex: 1, fontWeight: 'bold', color: '#374151' }}>Number</Text>
                <Text style={{ flex: 1, fontWeight: 'bold', color: '#374151' }}>ID</Text>
                <Text style={{ width: 80, fontWeight: 'bold', color: '#374151' }}>Actions</Text>
              </View>
            )}
          </View>
        }
        ListEmptyComponent={
          !selectedTeam ? (
            <Text style={{ textAlign: 'center', color: '#6b7280', marginTop: 20 }}>
              Create and select a team to get started.
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
