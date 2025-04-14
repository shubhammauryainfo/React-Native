import { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function GreetingScreen() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleGreet = () => {
    if (name.trim() === '') {
      setGreeting('Please enter your name!');
    } else {
      setGreeting(`Hello, ${name}! 👋`);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <View style={{ width: '100%', marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
          Greeting App 🚀
        </Text>
        <Text style={{ fontSize: 16, color: '#6b7280', textAlign: 'center' }}>
          Enter your name below and tap greet
        </Text>
      </View>

      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={{
          width: '100%',
          padding: 15,
          borderWidth: 1,
          borderColor: '#d1d5db',
          borderRadius: 8,
          marginBottom: 20,
          backgroundColor: '#ffffff',
        }}
      />

      <TouchableOpacity
        onPress={handleGreet}
        style={{
          backgroundColor: '#2563eb',
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Greet Me</Text>
      </TouchableOpacity>

      {greeting !== '' && (
        <Text style={{ marginTop: 30, fontSize: 20, fontWeight: '600', color: '#111827' }}>
          {greeting}
        </Text>
      )}
    </SafeAreaView>
  );
}
