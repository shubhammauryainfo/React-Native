import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen({ route }: any) {
  const navigation = useNavigation();
  const { chatId, chatName = 'Chat', chatAvatar } = route.params;

  const [messages, setMessages] = useState<{ _id: string; text: string; sender: string }[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    setMessages([
      { _id: '1', text: 'Hello!', sender: 'John' },
      { _id: '2', text: 'Hi there!', sender: 'You' },
    ]);
  }, [chatId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      { _id: Date.now().toString(), text: input, sender: 'You' },
      ...prev,
    ]);
    setInput('');
  };

  const renderMessage = ({ item }: { item: { _id: string; text: string; sender: string } }) => {
    const isSentByUser = item.sender === 'You';
    return (
      <View
        style={[
          styles.messageContainer,
          isSentByUser ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.message}>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ece5dd' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.chatTitle}>{chatName}</Text>
            <Text style={styles.chatSub}>Chat ID: {chatId}</Text>
          </View>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={renderMessage}
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 8 }}
          inverted
        />

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type a message"
            value={input}
            onChangeText={setInput}
            style={styles.input}
            placeholderTextColor="#888"
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  chatSub: {
    fontSize: 12,
    color: '#666',
  },
  messageContainer: {
    marginVertical: 6,
    padding: 10,
    borderRadius: 6,
    maxWidth: '80%',
  },
  sentMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  message: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
