import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomePage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');

  const handleSearch = () => {
    console.log('Search Query:', searchQuery);
    // Add search functionality here
  };

  const handleFeedbackSubmit = () => {
    console.log('Feedback:', feedback);
    // Add feedback submission logic here
  };

  const handleSubscribe = () => {
    console.log('Subscribed Email:', email);
    // Add subscription logic here
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        {/* Navbar (Left Side) */}
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.navbarText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SubMenu')}>
            <Icon name="bars" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for chats..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Icon name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Welcome to Live Chat APP!</Text>
          <Text style={styles.heroSubtitle}>
            Connect with friends and colleagues in real-time
          </Text>
          <Button
            title="Go to Chat"
            onPress={() => navigation.navigate('Chat')}
            color="#007BFF"
          />
        </View>

        {/* Feedback Form */}
        <View style={styles.feedbackSection}>
          <Text style={styles.sectionTitle}>We'd Love Your Comments!</Text>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Your feedback..."
            multiline
            numberOfLines={4}
            value={feedback}
            onChangeText={setFeedback}
          />
          <Button title="Submit Feedback" onPress={handleFeedbackSubmit} color="#28a745" />
        </View>

        {/* Newsletter Subscription */}
        <View style={styles.newsletterSection}>
          <Text style={styles.sectionTitle}>Subscribe to Our Newsletter</Text>
          <TextInput
            style={styles.emailInput}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Button title="Subscribe" onPress={handleSubscribe} color="#dc3545" />
        </View>

        {/* Bottom Menu */}
        <View style={styles.bottomMenu}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="home" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Icon name="wechat" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon name="user" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 10,
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
  feedbackSection: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  newsletterSection: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  emailInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
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
});

export default HomePage;