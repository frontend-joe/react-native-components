import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { routes } from "../routes";
import { colors } from "../theme/colors";

// Same "Name + number" natural sort as the web Layout, so Card2 comes before Card10.
const sortRoutes = (list) =>
  [...list].sort((a, b) => {
    const regex = /^([a-zA-Z]+)(\d*)$/;
    const matchA = a.name.match(regex);
    const matchB = b.name.match(regex);
    const textA = matchA ? matchA[1] : a.name;
    const textB = matchB ? matchB[1] : b.name;
    const numA = matchA && matchA[2] ? parseInt(matchA[2], 10) : 0;
    const numB = matchB && matchB[2] ? parseInt(matchB[2], 10) : 0;
    return textA.localeCompare(textB) || numA - numB;
  });

export default function Catalogue() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    const sorted = sortRoutes(routes);
    return q ? sorted.filter((r) => r.name.toLowerCase().includes(q)) : sorted;
  }, [query]);

  return (
    <View style={styles.page}>
      <View style={[styles.header, { paddingTop: insets.top + 40 }]}>
        <View style={styles.headerCurve} />
        <Text style={styles.title}>React Native Components</Text>
        <Text style={styles.count}>{routes.length} components</Text>
      </View>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search"
        placeholderTextColor={colors.textMuted}
        style={styles.search}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.path}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 24 }]}
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(item.path)}
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
          >
            <Text style={styles.rowText}>{item.name}</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No components match “{query}”</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  header: {
    overflow: "hidden",
    paddingHorizontal: 24,
    paddingBottom: 56,
  },
  headerCurve: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    width: 2000,
    height: 2000,
    marginLeft: -1000,
    borderRadius: 1000,
    backgroundColor: colors.primary,
  },
  title: { color: colors.text, fontSize: 24, fontWeight: "500" },
  count: { color: colors.text, opacity: 0.7, marginTop: 6, fontSize: 14 },
  search: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: 16,
  },
  list: { paddingHorizontal: 16, paddingTop: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 52,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  rowPressed: { backgroundColor: colors.surface },
  rowText: { color: colors.text, fontSize: 16 },
  chevron: { color: colors.textMuted, fontSize: 22 },
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  empty: { color: colors.textMuted, textAlign: "center", marginTop: 32 },
});
