import { StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { routes } from "../../routes";
import { colors } from "../../theme/colors";

// Every component screen goes through here: /cards/card-2 -> routes entry with that path.
export default function ComponentScreen() {
  const { category, name } = useLocalSearchParams();
  const route = routes.find((r) => r.path === `/${category}/${name}`);

  if (!route) {
    return (
      <View style={styles.missing}>
        <Stack.Screen options={{ title: "Not found" }} />
        <Text style={styles.missingText}>No component at /{category}/{name}</Text>
      </View>
    );
  }

  const { Component } = route;
  return (
    <>
      <Stack.Screen options={{ title: route.name }} />
      <Component />
    </>
  );
}

const styles = StyleSheet.create({
  missing: { flex: 1, alignItems: "center", justifyContent: "center" },
  missingText: { color: colors.textMuted },
});
