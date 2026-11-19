import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Check, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react-native";
import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
  ReceiptIllustration,
  SignUpIllustration,
} from "./icons";
import { useDeviceCornerRadius } from "../../../hooks/useDeviceCornerRadius";

const COLORS = {
  bg: "#F3F2F5",
  surface: "#FFFFFF",
  border: "#E4E3E8",
  text: "#16151A",
  muted: "#8E8C96",
  primary: "#E26A52",
  link: "#33429B",
};

const providers = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "google", label: "Google", Icon: GoogleIcon },
  { key: "apple", label: "Apple", Icon: AppleIcon },
];

const Divider = ({ label }) => (
  <View style={styles.divider}>
    <View style={styles.dividerLine} />
    <Text style={styles.dividerText}>{label}</Text>
    <View style={styles.dividerLine} />
  </View>
);

const PrimaryButton = ({ label, onPress }) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
  >
    <Text style={styles.primaryButtonText}>{label}</Text>
  </Pressable>
);

const GetStarted = ({ onProvider, onEmail, onPassword }) => (
  <>
    <View style={styles.illustration}>
      <SignUpIllustration color={COLORS.primary} width={230} />
    </View>
    <Text style={styles.title}>Let’s get started!</Text>

    <View style={styles.providerList}>
      {providers.map(({ key, label, Icon }) => (
        <Pressable
          key={key}
          onPress={() => onProvider(key)}
          accessibilityRole="button"
          style={({ pressed }) => [styles.providerButton, pressed && styles.pressedLight]}
        >
          <Icon size={22} />
          <Text style={styles.providerText}>Continue with {label}</Text>
        </Pressable>
      ))}
      <Pressable
        onPress={onEmail}
        accessibilityRole="button"
        style={({ pressed }) => [styles.providerButton, pressed && styles.pressedLight]}
      >
        <Mail size={22} color={COLORS.text} strokeWidth={1.8} />
        <Text style={styles.providerText}>Continue with Email</Text>
      </Pressable>
    </View>

    <View style={styles.spacer} />
    <Divider label="or continue with" />
    <PrimaryButton label="Sign In with password" onPress={onPassword} />
  </>
);

const Field = ({ Icon, right, ...inputProps }) => (
  <View style={styles.field}>
    <Icon size={18} color={COLORS.muted} strokeWidth={1.8} />
    <TextInput
      placeholderTextColor={COLORS.muted}
      style={styles.input}
      autoCapitalize="none"
      autoCorrect={false}
      {...inputProps}
    />
    {right}
  </View>
);

const SignIn = ({ onProvider, onSignIn, onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const passwordRef = useRef(null);

  return (
    <>
      <View style={styles.receipt}>
        <ReceiptIllustration color={COLORS.primary} size={84} />
      </View>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>You've been missed!</Text>

      <View style={styles.fields}>
        <Field
          Icon={Mail}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <Field
          Icon={LockKeyhole}
          ref={passwordRef}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={!showPassword}
          textContentType="password"
          autoComplete="current-password"
          returnKeyType="go"
          onSubmitEditing={() => onSignIn({ email, password, remember })}
          right={
            <Pressable
              onPress={() => setShowPassword((v) => !v)}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff size={18} color={COLORS.muted} strokeWidth={1.8} />
              ) : (
                <Eye size={18} color={COLORS.muted} strokeWidth={1.8} />
              )}
            </Pressable>
          }
        />
      </View>

      <Pressable
        onPress={() => setRemember((v) => !v)}
        style={styles.remember}
        hitSlop={8}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: remember }}
      >
        <View style={[styles.checkbox, remember && styles.checkboxChecked]}>
          {remember && <Check size={14} color="#fff" strokeWidth={3} />}
        </View>
        <Text style={styles.rememberText}>Remember me</Text>
      </Pressable>

      <PrimaryButton label="Sign In" onPress={() => onSignIn({ email, password, remember })} />

      <Pressable hitSlop={8} style={styles.forgot}>
        <Text style={styles.link}>Forgot the password?</Text>
      </Pressable>

      <Divider label="or continue with" />

      <View style={styles.iconRow}>
        {providers.map(({ key, label, Icon }) => (
          <Pressable
            key={key}
            onPress={() => onProvider(key)}
            accessibilityRole="button"
            accessibilityLabel={`Continue with ${label}`}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressedLight]}
          >
            <Icon size={26} />
          </Pressable>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <Pressable onPress={onSignUp} hitSlop={8}>
          <Text style={styles.signUp}>Sign Up</Text>
        </Pressable>
      </View>
    </>
  );
};

// iOS page-sheet transition: the first screen scales back and dims while
// the sign-in screen slides up over it. Drag the grabber down to dismiss.
const SPRING = { damping: 26, stiffness: 260, mass: 1, useNativeDriver: true };
const BACK_SCALE = 0.92;
const DISMISS_DISTANCE = 120;
const DISMISS_VELOCITY = 0.8;

export const Login1 = ({ onProvider = () => {}, onSignIn = () => {} }) => {
  const [open, setOpen] = useState(false);
  const [settledClosed, setSettledClosed] = useState(true); // back screen square-cornered at rest
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  // Match the screen's own corners; home-button iPhones are square, so keep a small minimum.
  const radius = Math.max(useDeviceCornerRadius(), 10);
  const progress = useRef(new Animated.Value(0)).current; // 0 = first screen, 1 = sheet up

  const animateTo = (toValue, velocity = 0) => {
    if (toValue === 1) setSettledClosed(false);
    Animated.spring(progress, { ...SPRING, toValue, velocity }).start(({ finished }) => {
      if (finished && toValue === 0) setSettledClosed(true);
    });
  };

  useEffect(() => {
    animateTo(open ? 1 : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const sheetTop = insets.top + 12;
  const sheetHeight = height - sheetTop;

  const pan = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) => g.dy > 4 && Math.abs(g.dy) > Math.abs(g.dx),
        onPanResponderMove: (_, g) => {
          progress.setValue(1 - Math.max(0, g.dy) / sheetHeight);
        },
        onPanResponderRelease: (_, g) => {
          const dismiss = g.dy > DISMISS_DISTANCE || g.vy > DISMISS_VELOCITY;
          if (dismiss) {
            setOpen(false); // effect springs it closed
          } else {
            animateTo(1);
          }
        },
        onPanResponderTerminate: () => animateTo(1),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sheetHeight]
  );

  const backStyle = {
    // Divide by the scale so the shrunken screen shows the same radius as the sheet.
    borderRadius: settledClosed ? 0 : radius / BACK_SCALE,
    transform: [
      { scale: progress.interpolate({ inputRange: [0, 1], outputRange: [1, BACK_SCALE] }) },
    ],
  };
  const dimStyle = {
    opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [0, 0.35] }),
  };
  const sheetStyle = {
    top: sheetTop,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [sheetHeight, 0],
          extrapolateLeft: "clamp",
        }),
      },
    ],
  };

  return (
    <View style={styles.page}>
      <StatusBar style={open ? "light" : "dark"} animated />

      <Animated.View style={[styles.back, backStyle]}>
        <ScrollView
          contentContainerStyle={[
            styles.screen,
            { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <GetStarted
            onProvider={onProvider}
            onEmail={() => setOpen(true)}
            onPassword={() => setOpen(true)}
          />
        </ScrollView>
        <Animated.View
          style={[styles.dim, dimStyle]}
          pointerEvents={open ? "auto" : "none"}
        >
          <Pressable style={styles.fill} onPress={() => setOpen(false)} />
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={[styles.sheet, sheetStyle]}
        pointerEvents={open ? "auto" : "none"}
        accessibilityViewIsModal={open}
      >
        <View style={styles.grabberArea} {...pan.panHandlers}>
          <View style={styles.grabber} />
        </View>
        <ScrollView
          contentContainerStyle={[styles.screen, { paddingBottom: insets.bottom + 24 }]}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets
        >
          <SignIn onProvider={onProvider} onSignIn={onSignIn} onSignUp={() => setOpen(false)} />
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#000" },
  back: { flex: 1, overflow: "hidden", backgroundColor: COLORS.bg },
  fill: { flex: 1 },
  dim: { position: "absolute", inset: 0, backgroundColor: "#000" },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    backgroundColor: COLORS.bg,
  },
  grabberArea: { alignItems: "center", paddingTop: 8, paddingBottom: 6 },
  grabber: { width: 36, height: 5, borderRadius: 2.5, backgroundColor: "#C9C7CF" },
  screen: { flexGrow: 1, paddingHorizontal: 24 },
  pressed: { opacity: 0.85 },
  pressedLight: { backgroundColor: "#F7F6F9" },

  illustration: { alignItems: "center", marginTop: 8 },
  receipt: { alignItems: "center", marginTop: 20, marginBottom: 24 },
  title: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: -0.5,
    marginTop: 20,
  },
  subtitle: { color: COLORS.text, opacity: 0.75, fontSize: 15, textAlign: "center", marginTop: 12 },

  providerList: { gap: 14, marginTop: 32, paddingHorizontal: 12 },
  providerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  providerText: { color: COLORS.text, fontSize: 16, fontWeight: "500" },
  spacer: { flexGrow: 1, minHeight: 24 },

  divider: { flexDirection: "row", alignItems: "center", gap: 14, marginVertical: 28 },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { color: COLORS.muted, fontSize: 13 },

  primaryButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  primaryButtonText: { color: "#fff", fontSize: 17, fontWeight: "600" },

  fields: { gap: 16, marginTop: 36 },
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: COLORS.surface,
  },
  input: { flex: 1, height: "100%", color: COLORS.text, fontSize: 16 },

  remember: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 18, marginBottom: 26 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: { backgroundColor: COLORS.primary },
  rememberText: { color: COLORS.text, fontSize: 15, fontWeight: "500" },

  forgot: { alignSelf: "center", marginTop: 22 },
  link: { color: COLORS.link, fontSize: 15 },

  iconRow: { flexDirection: "row", justifyContent: "center", gap: 18 },
  iconButton: {
    width: 76,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
  },
  footerText: { color: COLORS.text, fontSize: 15 },
  signUp: { color: COLORS.primary, fontSize: 16, fontWeight: "600" },
});
