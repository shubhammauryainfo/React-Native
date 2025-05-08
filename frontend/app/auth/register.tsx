import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !phone) {
      return Alert.alert('Missing Fields', 'Please fill all required fields');
    }

    try {
      setLoading(true);
      await register({ name, email, password, phone, avatar });
    } catch (err: any) {
      Alert.alert('Registration Failed', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold text-center mb-8 text-blue-700">Create Account 📝</Text>

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        className="border border-gray-300 p-4 rounded-md mb-3"
      />
      <TextInput
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        className="border border-gray-300 p-4 rounded-md mb-3"
      />
      <TextInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="border border-gray-300 p-4 rounded-md mb-3"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-gray-300 p-4 rounded-md mb-3"
      />
      <TextInput
        placeholder="Avatar (optional image URL)"
        value={avatar}
        onChangeText={setAvatar}
        className="border border-gray-300 p-4 rounded-md mb-5"
      />

      <TouchableOpacity
        onPress={handleRegister}
        className="bg-blue-600 py-4 rounded-md items-center"
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-bold text-lg">Register</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/auth/login')} className="mt-6">
        <Text className="text-center text-blue-500">Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
