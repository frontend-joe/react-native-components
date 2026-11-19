import { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Image accordion. The web version expands horizontally; on a phone it stacks vertically.
const EXPANDED = 5;
const COLLAPSED = 1;

const AccordionItem = ({ item, active, onPress }) => {
  const grow = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(grow, {
      toValue: active ? 1 : 0,
      duration: 400,
      useNativeDriver: false, // flex can't run on the native driver
    }).start();
  }, [active, grow]);

  const flex = grow.interpolate({ inputRange: [0, 1], outputRange: [COLLAPSED, EXPANDED] });

  return (
    <Animated.View style={[styles.item, { flex }]}>
      <Pressable
        onPress={onPress}
        style={styles.fill}
        accessibilityRole="button"
        accessibilityState={{ expanded: active }}
        accessibilityLabel={item.header}
      >
        <Image source={item.image} style={styles.image} />
        <View style={styles.shade} />
        <Animated.View style={[styles.content, { opacity: grow }]}>
          <Text style={styles.header}>{item.header}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export const Accordion1 = ({ items }) => {
  const [active, setActive] = useState(0);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.page, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }]}
    >
      <Image source={items[active].image} style={styles.bg} blurRadius={30} />
      <View style={styles.accordion}>
        {items.map((item, index) => (
          <AccordionItem
            key={item.header}
            item={item}
            active={active === index}
            onPress={() => setActive(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#000", padding: 20 },
  fill: { position: "absolute", inset: 0 },
  bg: { position: "absolute", inset: 0, opacity: 0.5 },
  accordion: { flex: 1, gap: 10 },
  item: { overflow: "hidden", borderRadius: 24, minHeight: 56 },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  shade: { position: "absolute", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.25)" },
  content: { position: "absolute", left: 22, right: 22, bottom: 22 },
  header: { color: "#fff", fontSize: 24, fontWeight: "500" },
  text: { color: "#fff", opacity: 0.8, fontSize: 14, marginTop: 4 },
});
