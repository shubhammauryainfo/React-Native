import { Stack } from 'expo-router';
import React from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';

export default function LayoutWrapper() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}

function RootLayout() {
  const { user } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <>
          <Stack.Screen name="auth/login" />
          <Stack.Screen name="auth/register" />
        </>
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
