import axios from 'axios';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://<your-backend-url>/api/users/login', {
        email, password
      });
      setUser(res.data.user);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <View className="p-4">
      <Text className="text-xl font-bold mb-4">Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} className="border p-2 mb-2" />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} className="border p-2 mb-4" />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
