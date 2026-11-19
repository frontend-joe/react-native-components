import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Card2 } from "./Card2";
import image from "./image.jpg";

export const Card2Example = () => {
  const handleProfile = () => {
    // goto profile
  };

  const handleFollow = () => {
    // follow account
  };

  return (
    <LinearGradient
      colors={["#0cd2d1", "#0857c0"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.page}
    >
      <Card2
        image={image}
        title="Jess Wilson"
        subtitle="UX Engineer"
        description="Empowering users through captivating interfaces, turning ideas into pixel-perfect realities."
        onProfile={handleProfile}
        onFollow={handleFollow}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
});
