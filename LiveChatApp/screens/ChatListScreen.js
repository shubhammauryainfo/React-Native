import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ChatListScreen({ route, navigation }) {
  const { username } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {username}!</Text>
      <Button
        title="Go to Chat Room"
        onPress={() => navigation.navigate('ChatRoom', { roomName: 'General' })}
      />
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
