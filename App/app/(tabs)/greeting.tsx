import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

export default function GreetingScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [greetingTitle, setGreetingTitle] = useState('🎉 Happy Birthday! 🎂');
  const [message, setMessage] = useState('Wishing you love, laughter, and cake!');
  const [hasMediaPermission, setHasMediaPermission] = useState<boolean | null>(null);

  const cardRef = useRef<View>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const saveGreeting = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    setHasMediaPermission(status === 'granted');

    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Cannot save image without permission.');
      return;
    }

    try {
      const uri = await captureRef(cardRef, {
        format: 'png',
        quality: 1,
      });

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Birthday Greetings', asset, false);

      Alert.alert('Saved!', 'Your greeting has been saved to the gallery 🎉');
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert('Error', 'Something went wrong while saving.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View ref={cardRef} collapsable={false} style={styles.card}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>No Photo</Text>
            </View>
          )}

          <Text style={styles.greeting}>{greetingTitle}</Text>
          <Text style={styles.customMessage}>{message}</Text>
        </View>

        {/* Editable Heading */}
        <TextInput
          placeholder="Edit greeting title"
          value={greetingTitle}
          onChangeText={setGreetingTitle}
          style={styles.input}
        />

        {/* Editable Message */}
        <TextInput
          placeholder="Add a custom message..."
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />

        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>
            {imageUri ? 'Retake Photo' : 'Take Photo'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={saveGreeting} style={[styles.button, { backgroundColor: '#10b981' }]}>
          <Text style={styles.buttonText}>Download Greeting</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef9f3',
    justifyContent: 'center',
  },
  inner: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: '100%',
    maxWidth: 350,
    marginBottom: 24,
  },
  image: {
    width: 280,
    height: 280,
    borderRadius: 16,
    marginBottom: 16,
  },
  placeholder: {
    width: 280,
    height: 280,
    backgroundColor: '#e5e7eb',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  placeholderText: {
    color: '#6b7280',
    fontSize: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d97706',
    marginBottom: 8,
    textAlign: 'center',
  },
  customMessage: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginTop: 4,
  },
  input: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    borderColor: '#d1d5db',
    borderWidth: 1,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
