import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export const Card2 = ({ image, title, subtitle, description, onProfile, onFollow }) => (
  <View style={styles.card}>
    <Image source={image} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
    <Text style={styles.description}>{description}</Text>
    <View style={styles.buttons}>
      <Pressable
        onPress={onProfile}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <Text style={styles.buttonText}>Profile</Text>
      </Pressable>
      <Pressable
        onPress={onFollow}
        style={({ pressed }) => [styles.button, styles.primary, pressed && styles.pressed]}
      >
        <Text style={[styles.buttonText, styles.primaryText]}>Follow</Text>
      </Pressable>
    </View>
  </View>
);

const IMAGE_SIZE = 180;

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    width: "100%",
    maxWidth: 420,
    marginTop: IMAGE_SIZE / 2,
    paddingHorizontal: 32,
    paddingBottom: 44,
    backgroundColor: "#121017",
    borderRadius: 24,
    boxShadow: "0 40px 40px rgba(0, 0, 0, 0.12)",
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    marginTop: -IMAGE_SIZE / 2,
    marginBottom: 28,
    boxShadow: "0 30px 30px rgba(0, 0, 0, 0.12)",
  },
  title: { color: "#fdfcfd", fontSize: 26, marginBottom: 6 },
  subtitle: { color: "#fdfcfd", fontSize: 16, opacity: 0.66, marginBottom: 12 },
  description: {
    color: "#fdfcfd",
    fontSize: 14,
    lineHeight: 21,
    opacity: 0.42,
    textAlign: "center",
    marginBottom: 30,
  },
  buttons: { flexDirection: "row", gap: 12, width: "100%" },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 13,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#f8f8f8",
  },
  primary: { backgroundColor: "#ffffff" },
  pressed: { opacity: 0.7 },
  buttonText: { color: "#f8f8f8", fontSize: 16 },
  primaryText: { color: "#121017" },
});
