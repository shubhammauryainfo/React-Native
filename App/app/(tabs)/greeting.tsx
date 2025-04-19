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
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function GreetingScreen() {
  const insets = useSafeAreaInsets();
  const cardRef = useRef<View>(null);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [greetingTitle, setGreetingTitle] = useState('🎉 Happy Birthday! 🎂');
  const [message, setMessage] = useState('Wishing you love, laughter, and cake!');
  const [hasMediaPermission, setHasMediaPermission] = useState<boolean | null>(null);

  const handleImagePicker = async () => {
    Alert.alert('Select Photo', 'Choose an option', [
      {
        text: 'Take Photo',
        onPress: async () => {
          const permission = await ImagePicker.requestCameraPermissionsAsync();
          if (!permission.granted) {
            Alert.alert('Permission required', 'Camera permission is required.');
            return;
          }

          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
          });

          if (!result.canceled) {
            setImageUri(result.assets[0].uri);
          }
        },
      },
      {
        text: 'Choose from Gallery',
        onPress: async () => {
          const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (!permission.granted) {
            Alert.alert('Permission required', 'Gallery access is required.');
            return;
          }

          const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
          });

          if (!result.canceled) {
            setImageUri(result.assets[0].uri);
          }
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const saveGreeting = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    setHasMediaPermission(status === 'granted');

    if (!status || status !== 'granted') {
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
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>
          {/* Greeting Card */}
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

          {/* Editable Greeting Title */}
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

          {/* Take or Choose Photo Button */}
          <TouchableOpacity onPress={handleImagePicker} style={styles.button}>
            <View style={styles.iconButton}>
              <Ionicons name="camera-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.buttonText}>
                {imageUri ? 'Retake or Choose Photo' : 'Take or Choose Photo'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Download Greeting */}
          <TouchableOpacity
            onPress={saveGreeting}
            style={[styles.button, { backgroundColor: '#10b981' }]}
          >
            <View style={styles.iconButton}>
              <Ionicons name="download-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.buttonText}>Download Greeting</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef9f3',
  },
  scrollContent: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  inner: {
    alignItems: 'center',
    maxWidth: 400,
    alignSelf: 'center',
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
    shadowOffset: { width: 0, height: 4 },
    width: '100%',
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
    marginBottom: 6,
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
    backgroundColor: '#f3f4f6',
    padding: 14,
    borderRadius: 10,
    borderColor: '#d1d5db',
    borderWidth: 1,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
