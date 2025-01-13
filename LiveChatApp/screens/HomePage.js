import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomePage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Navbar (Left Side) */}
      <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.navbarText}>Login</Text>
          
        </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SubMenu')}>
      <Icon name="bars" size={30} color="white" />
      </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Welcome to Live Chat APP!</Text>
        <Text style={styles.heroSubtitle}>Connect with friends and colleagues in real-time</Text>
        <Button
          title="Go to Chat"
          onPress={() => navigation.navigate('Chat')}
          color="#007BFF"
        />
      </View>

      {/* Bottom Menu */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="home" size={30} color="white"  />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Icon name="wechat" size={30} color="white"  />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="user" size={30} color="white"  />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  navbar: {
    padding: 10,
    backgroundColor: '#343a40',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navbarText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: '#007BFF',
  },
  heroTitle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  bottomMenu: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#343a40',
    borderWidth: 1,
    borderColor: '#e9ecef',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  bottomMenuText: {
    backgroundColor: '#f06124',
    padding: 10,
    border: 1,
    borderRadius: 5,
    color: '#fff',
    fontSize: 16,
  },
});

export default HomePage;
