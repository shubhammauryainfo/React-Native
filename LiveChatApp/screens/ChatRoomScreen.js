import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'expo-linear-gradient'; // For gradient background

export default function ChatRoomScreen({ route }) {
  const { roomName } = route.params;

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']} // Gradient colors
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.roomName}>{roomName}</Text>
        <Text style={styles.subtitle}>Start chatting with your friends!</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    color: '#fff',
    marginBottom: 10,
  },
  roomName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
});