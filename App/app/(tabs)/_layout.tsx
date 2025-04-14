import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      {/* Add this line 👇 */}
      <Tabs.Screen name="greeting" options={{ title: 'Greeting' }} />
    </Tabs>
  );
}
