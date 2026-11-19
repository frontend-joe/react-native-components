import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "../theme/colors";

export const unstable_settings = { anchor: "index" };

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          // Examples are full-screen: no header, swipe right anywhere to go back (iOS).
          headerShown: false,
          gestureEnabled: true,
          fullScreenGestureEnabled: true,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Components" }} />
      </Stack>
    </>
  );
}
