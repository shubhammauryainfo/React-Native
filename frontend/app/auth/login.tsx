import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'Please fill all fields');
    try {
      setLoading(true);
      await login(email, password);
    } catch (err: any) {
      Alert.alert('Login Failed', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold text-center mb-8 text-blue-700">Welcome Back 👋</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="border border-gray-300 p-4 rounded-md mb-4"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-gray-300 p-4 rounded-md mb-6"
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-blue-600 py-4 rounded-md items-center"
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-bold text-lg">Login</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/auth/register')} className="mt-6">
        <Text className="text-center text-blue-500">Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}
