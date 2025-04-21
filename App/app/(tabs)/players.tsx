import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
  StyleSheet,
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
    <View style={styles.playerRow}>
      <Text style={styles.playerText}>{item.name}</Text>
      <Text style={styles.playerText}>{item.number}</Text>
      <Text style={styles.playerText}>{item.id}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => handleEditPlayer(item)} style={styles.editButton}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeletePlayer(item.id)} style={styles.deleteButton}>
          <Text style={styles.actionText}>Del</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={renderPlayerRow}
        ListHeaderComponent={
          <View>
            {/* Team Form */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                {editingTeamId ? 'Edit Team Name' : 'Create New Team'}
              </Text>
              <TextInput
                placeholder="Enter Team Name"
                value={teamNameInput}
                onChangeText={setTeamNameInput}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={handleCreateOrUpdateTeam}
                style={[
                  styles.button,
                  { backgroundColor: editingTeamId ? '#f59e0b' : '#2563eb' },
                ]}
              >
                <Text style={styles.buttonText}>
                  {editingTeamId ? 'Update Team' : 'Create Team'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Team List */}
            {teams.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Select a Team</Text>
                {teams.map((team) => (
                  <View key={team.id} style={styles.teamRow}>
                    <TouchableOpacity
                      onPress={() => setSelectedTeamId(team.id)}
                      style={[
                        styles.teamButton,
                        {
                          backgroundColor:
                            selectedTeamId === team.id ? '#2563eb' : '#f3f4f6',
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: selectedTeamId === team.id ? '#fff' : '#111827',
                        }}
                      >
                        {team.name}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleEditTeam(team)} style={styles.editButton}>
                      <Text style={styles.actionText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteTeam(team.id)} style={styles.deleteButton}>
                      <Text style={styles.actionText}>Del</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Player Form */}
            {selectedTeam && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>
                  {editingPlayerId ? 'Edit Player' : 'Add Player'}
                </Text>
                <TextInput
                  placeholder="Player Name"
                  value={playerName}
                  onChangeText={setPlayerName}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Player Number"
                  value={playerNumber}
                  onChangeText={setPlayerNumber}
                  keyboardType="numeric"
                  style={styles.input}
                />
                <TextInput
                  placeholder="Player ID"
                  value={playerId}
                  onChangeText={setPlayerId}
                  style={styles.input}
                />
                <TouchableOpacity
                  onPress={handleAddOrUpdatePlayer}
                  style={[
                    styles.button,
                    { backgroundColor: editingPlayerId ? '#f59e0b' : '#2563eb' },
                  ]}
                >
                  <Text style={styles.buttonText}>
                    {editingPlayerId ? 'Update Player' : 'Add Player'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Table Header */}
            {players.length > 0 && (
              <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Name</Text>
                <Text style={styles.headerText}>Number</Text>
                <Text style={styles.headerText}>ID</Text>
                <Text style={styles.headerText}>Actions</Text>
              </View>
            )}
          </View>
        }
        ListEmptyComponent={
          !selectedTeam ? (
            <Text style={styles.emptyText}>
              Create and select a team to get started.
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#111827',
  },
  input: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginBottom: 14,
    fontSize: 15,
    color: '#111827',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  teamButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  playerText: {
    flex: 1,
    color: '#374151',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: '#10b981',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  actionText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#d1d5db',
    paddingBottom: 8,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    color: '#374151',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 20,
    fontSize: 14,
  },
});
