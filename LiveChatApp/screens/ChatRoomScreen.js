import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatRoomScreen({ route }) {
  const { roomName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Room: {roomName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
