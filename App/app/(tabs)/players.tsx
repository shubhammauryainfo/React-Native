import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
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
      // Update team
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team.id === editingTeamId ? { ...team, name: teamNameInput } : team
        )
      );
    } else {
      // Create team
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
    Alert.alert('Delete Team', 'Are you sure you want to delete this team?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setTeams((prevTeams) => prevTeams.filter((team) => team.id !== teamId));
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

  const handleAddOrUpdatePlayer = () => {
    if (!playerName.trim() || !playerNumber.trim() || !playerId.trim()) {
      alert('Please fill all player fields');
      return;
    }

    if (!selectedTeam) {
      alert('Please select a team first');
      return;
    }

    const updatedPlayers = editingPlayerId
      ? selectedTeam.players.map((player) =>
          player.id === editingPlayerId
            ? { id: playerId, name: playerName, number: playerNumber }
            : player
        )
      : [
          ...selectedTeam.players,
          { id: playerId, name: playerName, number: playerNumber },
        ];

    setTeams((prevTeams) =>
      prevTeams.map((team) =>
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

  const handleDeletePlayer = (playerIdToDelete: string) => {
    if (!selectedTeam) return;

    Alert.alert('Delete Player', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updatedPlayers = selectedTeam.players.filter(
            (player) => player.id !== playerIdToDelete
          );
          setTeams((prevTeams) =>
            prevTeams.map((team) =>
              team.id === selectedTeam.id ? { ...team, players: updatedPlayers } : team
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
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      }}
    >
      <Text style={{ flex: 1, color: '#374151' }}>{item.name}</Text>
      <Text style={{ flex: 1, color: '#374151' }}>{item.number}</Text>
      <Text style={{ flex: 1, color: '#374151' }}>{item.id}</Text>
      <View style={{ width: 80, flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => handleEditPlayer(item)}
          style={{
            backgroundColor: '#10b981',
            padding: 4,
            borderRadius: 4,
            marginRight: 4,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 12 }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeletePlayer(item.id)}
          style={{
            backgroundColor: '#ef4444',
            padding: 4,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 12 }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb', padding: 20 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {/* Team Creation / Editing */}
        <View
          style={{
            marginBottom: 24,
            backgroundColor: '#ffffff',
            padding: 20,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 5 },
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
            {editingTeamId ? 'Edit Team Name' : 'Create New Team 🏆'}
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
              marginBottom: 16,
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
            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
              {editingTeamId ? 'Update Team' : 'Create Team'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Team Selection */}
        {teams.length > 0 && (
          <View
            style={{
              marginBottom: 24,
              backgroundColor: '#ffffff',
              padding: 20,
              borderRadius: 12,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 5 },
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
              Select Team
            </Text>
            {teams.map((team) => (
              <View
                key={team.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() => setSelectedTeamId(team.id)}
                  style={{
                    flex: 1,
                    backgroundColor: selectedTeamId === team.id ? '#2563eb' : '#f3f4f6',
                    padding: 12,
                    borderRadius: 8,
                    marginRight: 8,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: selectedTeamId === team.id ? '#ffffff' : '#111827',
                      fontWeight: 'bold',
                    }}
                  >
                    {team.name}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleEditTeam(team)}
                  style={{
                    backgroundColor: '#10b981',
                    padding: 8,
                    borderRadius: 4,
                    marginRight: 4,
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 12 }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteTeam(team.id)}
                  style={{
                    backgroundColor: '#ef4444',
                    padding: 8,
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 12 }}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Player Form & List */}
        {selectedTeam && (
          <>
            {/* Player Form */}
            <View
              style={{
                backgroundColor: '#ffffff',
                padding: 20,
                borderRadius: 12,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 5 },
                elevation: 5,
                marginBottom: 24,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
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
                <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
                  {editingPlayerId ? 'Update Player' : 'Add Player'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Player Table */}
            <View
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 12,
                padding: 16,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 5 },
                elevation: 5,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
                {selectedTeam.name} - Players List
              </Text>

              {selectedTeam.players.length === 0 ? (
                <Text style={{ textAlign: 'center', color: '#6b7280' }}>
                  No players added yet.
                </Text>
              ) : (
                <>
                  <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#d1d5db', paddingBottom: 8, marginBottom: 8 }}>
                    <Text style={{ flex: 1, fontWeight: 'bold', color: '#374151' }}>Name</Text>
                    <Text style={{ flex: 1, fontWeight: 'bold', color: '#374151' }}>Number</Text>
                    <Text style={{ flex: 1, fontWeight: 'bold', color: '#374151' }}>ID</Text>
                    <Text style={{ width: 80, fontWeight: 'bold', color: '#374151' }}>Actions</Text>
                  </View>
                  <FlatList
                    data={selectedTeam.players}
                    keyExtractor={(item) => item.id}
                    renderItem={renderPlayerRow}
                  />
                </>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
