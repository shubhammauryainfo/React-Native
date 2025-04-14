import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Hero Section */}
        <View style={{ marginBottom: 32, alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/favicon.png')}
            style={{ width: '100%', height: 300, borderRadius: 12, marginBottom: 16 }}
            resizeMode="cover"
          />
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#111827', textAlign: 'center' }}>
            Welcome to NexBytes 🚀
          </Text>
          <Text style={{ fontSize: 16, color: '#6b7280', textAlign: 'center', marginTop: 8 }}>
            Empowering your digital journey with innovation, creativity, and technology.
          </Text>
        </View>

        {/* About NexBytes */}
        <View
          style={{
            backgroundColor: '#ffffff',
            padding: 20,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 5 },
            elevation: 5,
            marginBottom: 32,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>
            About NexBytes
          </Text>
          <Text style={{ fontSize: 16, color: '#374151', lineHeight: 24 }}>
            NexBytes is a cutting-edge digital solutions provider, dedicated to helping businesses thrive in the digital era. 
            We specialize in crafting custom software, mobile applications, and seamless web experiences. 
            Our mission is to transform ideas into reality through innovative design and robust development.
          </Text>
        </View>

        {/* Services Section */}
        <View
          style={{
            backgroundColor: '#ffffff',
            padding: 20,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 5 },
            elevation: 5,
            marginBottom: 32,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>
            Our Services
          </Text>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>🚀 Web & App Development</Text>
            <Text style={{ color: '#6b7280', marginTop: 4 }}>
              Building high-performance, scalable applications tailored to your needs.
            </Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>☁️ Cloud Solutions</Text>
            <Text style={{ color: '#6b7280', marginTop: 4 }}>
              Secure, scalable, and modern cloud services for your business growth.
            </Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>🎨 UI/UX Design</Text>
            <Text style={{ color: '#6b7280', marginTop: 4 }}>
              Designing delightful user experiences that engage and convert.
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#2563eb',
              padding: 14,
              borderRadius: 8,
              alignItems: 'center',
              marginTop: 8,
            }}
          >
            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        {/* Call to Action */}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 8 }}>
            Ready to build something amazing?
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#10b981',
              paddingVertical: 14,
              paddingHorizontal: 32,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
