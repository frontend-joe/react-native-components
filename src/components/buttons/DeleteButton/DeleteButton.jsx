import { useRef, useState } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";

// Port of the web DeleteButton: lid opens, two balls drop into the can, can fills up.
const DURATION = 2500;

export const DeleteButton = () => {
  const [busy, setBusy] = useState(false);
  const progress = useRef(new Animated.Value(0)).current; // drives lid + fill
  const drop = useRef(new Animated.Value(0)).current; // drives the falling ball

  const handlePress = () => {
    setBusy(true);
    progress.setValue(0);
    drop.setValue(0);

    Animated.parallel([
      Animated.timing(progress, {
        toValue: 1,
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.timing(drop, {
          toValue: 1,
          duration: DURATION / 2,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        { iterations: 2 }
      ),
    ]).start(() => {
      // do something async, then hold the finished state briefly
      setTimeout(() => {
        progress.setValue(0);
        drop.setValue(0);
        setBusy(false);
      }, 1250);
    });
  };

  const lidRotate = progress.interpolate({
    inputRange: [0, 0.15, 0.9, 1],
    outputRange: ["0deg", "-75deg", "-75deg", "0deg"],
  });
  const lidX = progress.interpolate({
    inputRange: [0, 0.15, 0.9, 1],
    outputRange: [0, -14, -14, 0],
  });
  const fillY = progress.interpolate({
    inputRange: [0, 0.2, 0.5, 0.7, 0.9, 1],
    outputRange: [0, 0, -FILL_HEIGHT / 2, -FILL_HEIGHT / 2, -FILL_HEIGHT, -FILL_HEIGHT],
  });
  const ballY = drop.interpolate({
    inputRange: [0, 0.2, 0.4, 1],
    outputRange: [0, 0, 72, 72],
  });
  const ballScaleX = drop.interpolate({
    inputRange: [0, 0.4, 0.5, 1],
    outputRange: [1, 1, 2.1, 2.1],
  });

  return (
    <View style={styles.page}>
      <Pressable
        onPress={handlePress}
        disabled={busy}
        accessibilityRole="button"
        accessibilityLabel={busy ? "Deleting" : "Delete"}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <Text style={styles.text}>{busy ? "Deleting" : "Delete"}</Text>
        <View style={styles.animation}>
          <Animated.View
            style={[styles.ball, { transform: [{ translateY: ballY }, { scaleX: ballScaleX }] }]}
          />
          <Animated.View
            style={[
              styles.lid,
              { transform: [{ translateX: lidX }, { rotate: lidRotate }] },
            ]}
          />
          <View style={styles.can}>
            <Animated.View style={[styles.filler, { transform: [{ translateY: fillY }] }]} />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const CAN_HEIGHT = 22;
const FILL_HEIGHT = CAN_HEIGHT * 1.2;

const styles = StyleSheet.create({
  page: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#141414" },
  button: {
    flexDirection: "row",
    alignItems: "center",
    height: 74,
    paddingLeft: 32,
    paddingRight: 10,
    borderRadius: 18,
    backgroundColor: "#fc3b51",
  },
  pressed: { opacity: 0.85 },
  text: { color: "#f9f9f9", fontSize: 24, minWidth: 94, textAlign: "center" },
  animation: {
    width: 64,
    height: 74,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  can: {
    overflow: "hidden",
    width: 20,
    height: CAN_HEIGHT,
    marginTop: 4,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: "#ffffff",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  lid: {
    position: "absolute",
    top: 24,
    left: 20,
    width: 24,
    height: 2,
    backgroundColor: "#ffffff",
    transformOrigin: "left top",
  },
  ball: {
    position: "absolute",
    top: -32,
    left: 27.5,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "#ffffff",
  },
  filler: {
    position: "absolute",
    top: CAN_HEIGHT,
    left: -22,
    width: 64,
    height: FILL_HEIGHT,
    backgroundColor: "#ffffff",
  },
});
