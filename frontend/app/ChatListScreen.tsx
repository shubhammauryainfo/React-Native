import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

type Chat = {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  participants: string[];
  lastMessage?: string;
  lastMessageTime?: string;
};

function getInitials(name: string) {
  const words = name.split(' ');
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
}

export default function ChatListScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake data – replace this with an API call later
    setTimeout(() => {
      setChats([
        { 
          _id: '1', 
          chatName: 'Study Group', 
          isGroupChat: true, 
          participants: [], 
          lastMessage: 'Don\'t forget the meeting at 10 AM!', 
          lastMessageTime: '9:45 AM' 
        },
        { 
          _id: '2', 
          chatName: 'John Doe', 
          isGroupChat: false, 
          participants: [], 
          lastMessage: 'Got it, thanks!', 
          lastMessageTime: 'Yesterday' 
        },
        { 
          _id: '3', 
          chatName: 'Family', 
          isGroupChat: true, 
          participants: [], 
          lastMessage: 'Dinner at 7?', 
          lastMessageTime: 'Mon' 
        },
        { 
          _id: '4', 
          chatName: 'Alice Smith', 
          isGroupChat: false, 
          participants: [], 
          lastMessage: 'See you soon!', 
          lastMessageTime: 'Sun' 
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handlePress = (chatId: string) => {
    navigation.navigate('ChatScreen', { chatId });
  };

  const renderChatItem = ({ item }: { item: Chat }) => {
    return (
      <TouchableOpacity style={styles.chatItem} onPress={() => handlePress(item._id)}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, item.isGroupChat ? styles.groupAvatar : styles.directAvatar]}>
            <Text style={styles.avatarText}>{getInitials(item.chatName)}</Text>
          </View>
        </View>
        <View style={styles.chatDetails}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName} numberOfLines={1}>{item.chatName}</Text>
            <Text style={styles.chatTime}>{item.lastMessageTime}</Text>
          </View>
          <Text style={styles.chatLastMessage} numberOfLines={1}>{item.lastMessage}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.header}>Chats</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#075E54" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(item) => item._id}
          renderItem={renderChatItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ece5dd',
  },
  headerBar: {
    backgroundColor: '#075E54',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  header: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#25d366',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  chatItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupAvatar: {
    backgroundColor: '#34b7f1',
  },
  directAvatar: {
    backgroundColor: '#25d366',
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatDetails: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    maxWidth: '75%',
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
  },
  chatLastMessage: {
    fontSize: 14,
    color: '#555',
  },
  separator: {
    height: 8,
  },
});

