import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80 }}>
        {/* Hero Section */}
        <View style={{ marginBottom: 32, alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/favicon.png')}
            style={{
              width: '100%',
              height: 240,
              borderRadius: 16,
              marginBottom: 20,
            }}
            resizeMode="cover"
          />
          <Text style={{ fontSize: 28, fontWeight: 'bold' as 'bold', color: '#111827', textAlign: 'center' }}>
            Welcome to NexBytes 🚀
          </Text>
          <Text style={{ fontSize: 16, color: '#6b7280', textAlign: 'center', marginTop: 8, lineHeight: 24 }}>
            Empowering your digital journey with innovation, creativity, and technology.
          </Text>
        </View>

        {/* About Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About NexBytes</Text>
          <Text style={styles.cardText}>
            NexBytes is a cutting-edge digital solutions provider, dedicated to helping businesses thrive in the digital era.
            We specialize in crafting custom software, mobile applications, and seamless web experiences.
            Our mission is to transform ideas into reality through innovative design and robust development.
          </Text>
        </View>

        {/* Services */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Our Services</Text>

          <View style={{ marginBottom: 16 }}>
            <Text style={{...styles.serviceTitle, fontWeight: 'bold' as 'bold'}}>🚀 Web & App Development</Text>
            <Text style={styles.serviceText}>
              Building high-performance, scalable applications tailored to your needs.
            </Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={styles.serviceTitle}>☁️ Cloud Solutions</Text>
            <Text style={styles.serviceText}>
              Secure, scalable, and modern cloud services for your business growth.
            </Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={styles.serviceTitle}>🎨 UI/UX Design</Text>
            <Text style={styles.serviceText}>
              Designing delightful user experiences that engage and convert.
            </Text>
          </View>

          <TouchableOpacity
            style={{...styles.primaryButton, alignItems: 'center' as 'center'}}
            onPress={() => alert('Contact feature coming soon!')}
          >
            <Text style={styles.primaryButtonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        {/* App Features */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Explore Our Features</Text>

          <TouchableOpacity
            onPress={() => router.push('/players')}
            style={{...styles.featureButton, alignItems: 'center'}}
          >
            <Text style={styles.featureButtonText}>👥 Manage Players</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/greeting')}
            style={{...styles.featureButton, alignItems: 'center'}}
          >
            <Text style={styles.featureButtonText}>🎉 Create Greeting</Text>
          </TouchableOpacity>
        </View>

        {/* Call to Action */}
        <View style={{ alignItems: 'center', marginTop: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' as 'bold', color: '#111827', marginBottom: 12, textAlign: 'center' }}>
            Ready to build something amazing?
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#10b981',
              paddingVertical: 14,
              paddingHorizontal: 32,
              borderRadius: 8,
            }}
            onPress={() => alert('Getting started... 🚀')}
          >
            <Text style={{ color: '#ffffff', fontWeight: 'bold' as 'bold', fontSize: 16 }}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: 28,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold' as 'bold',
    marginBottom: 12,
    color: '#111827',
  },
  cardText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '600' as '600',
    color: '#111827',
  },
  serviceText: {
    color: '#6b7280',
    marginTop: 4,
    fontSize: 15,
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: 'bold' as 'bold',
    fontSize: 15,
  },
  featureButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  featureButtonText: {
    fontWeight: '600' as '600',
    color: '#111827',
    fontSize: 16,
  },
};
