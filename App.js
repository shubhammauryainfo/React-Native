import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "react-native-elements"; // Example package

const App = ({ heroImageSource }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar Section */}
      <Header
        leftComponent={{
          text: "K.L. School",
          style: { color: "#fff", fontSize: 18, fontWeight: "bold" },
        }}
        rightComponent={{ icon: "menu", color: "#fff" }}
        containerStyle={{ backgroundColor: "#004aad" }}
      />

      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Image
            source={heroImageSource || require("./assets/image.jpg")} // Default image
            style={styles.heroImage}
          />
          <Text style={styles.heroText}>Welcome to K.L. English School</Text>
          <Text style={styles.heroSubText}>
            Nurturing Excellence in Education
          </Text>
        </View>

        {/* About Us Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.sectionText}>
            K.L. English School has been providing quality education for over 50
            years. We focus on academic excellence, personal growth, and
            community involvement.
          </Text>
        </View>

        {/* Facilities Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Facilities</Text>
          <Text style={styles.sectionText}>
            Our school offers modern facilities including well-equipped
            classrooms, state-of-the-art science labs, sports facilities, and a
            library stocked with diverse resources.
          </Text>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Contact Us: (123) 456-7890</Text>
          <Text style={styles.footerText}>Email: info@klschool.com</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  hero: {
    backgroundColor: "#004aad",
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  heroImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  heroText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
  },
  heroSubText: {
    color: "#ffffff",
    fontSize: 18,
    marginTop: 10,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: "#555",
  },
  footer: {
    backgroundColor: "#004aad",
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default App;
