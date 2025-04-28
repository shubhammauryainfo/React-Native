import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function GalleryScreen() {
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');

      if (status === 'granted') {
        const media = await MediaLibrary.getAssetsAsync({
          mediaType: 'photo',
          first: 1000, // how many images to load
        });
        setPhotos(media.assets);
      }
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.centered}>
        <Text style={styles.permissionText}>Permission to access gallery is required!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8}>
            <Image
              source={{ uri: item.uri }}
              style={styles.image}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: '#6b7280',
  },
  image: {
    width: '32%',
    aspectRatio: 1,
    margin: 4,
    borderRadius: 8,
  },
});

