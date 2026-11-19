import { Dimensions, Platform } from "react-native";
import * as Device from "expo-device";

// iOS doesn't expose the display corner radius publicly, so look it up.
// Values are in points (community-measured; iPhone 17 family assumed to match 16 Pro).

const BY_MODEL_ID = {
  // X / XS / XS Max / 11 Pro / 11 Pro Max
  "iPhone10,3": 39, "iPhone10,6": 39, "iPhone11,2": 39, "iPhone11,4": 39, "iPhone11,6": 39,
  "iPhone12,3": 39, "iPhone12,5": 39,
  // XR / 11
  "iPhone11,8": 41.5, "iPhone12,1": 41.5,
  // 12 mini / 13 mini
  "iPhone13,1": 44, "iPhone14,4": 44,
  // 12 / 12 Pro / 13 / 13 Pro / 14 / 16e
  "iPhone13,2": 47.33, "iPhone13,3": 47.33, "iPhone14,5": 47.33, "iPhone14,2": 47.33,
  "iPhone14,7": 47.33, "iPhone17,5": 47.33,
  // 12 Pro Max / 13 Pro Max / 14 Plus
  "iPhone13,4": 53.33, "iPhone14,3": 53.33, "iPhone14,8": 53.33,
  // 14 Pro / 14 Pro Max / 15 / 15 Plus / 15 Pro / 15 Pro Max / 16 / 16 Plus
  "iPhone15,2": 55, "iPhone15,3": 55, "iPhone15,4": 55, "iPhone15,5": 55,
  "iPhone16,1": 55, "iPhone16,2": 55, "iPhone17,3": 55, "iPhone17,4": 55,
  // 16 Pro / 16 Pro Max / 17 / 17 Pro / 17 Pro Max / Air
  "iPhone17,1": 62, "iPhone17,2": 62, "iPhone18,1": 62, "iPhone18,2": 62,
  "iPhone18,3": 62, "iPhone18,4": 62,
  // Home-button phones (SE, 8 and earlier) have square displays
  "iPhone12,8": 0, "iPhone14,6": 0,
};

// Fallback by screen size in points — also what the simulator hits,
// since expo-device reports "arm64" there instead of a model id.
const BY_SCREEN = {
  "375x812": 39, // X / XS / 11 Pro (12/13 mini are 44)
  "414x896": 41.5, // XR / 11 (XS Max / 11 Pro Max are 39)
  "390x844": 47.33,
  "428x926": 53.33,
  "393x852": 55,
  "430x932": 55,
  "402x874": 62,
  "420x912": 62,
  "440x956": 62,
};

const ANDROID_RADIUS = 28; // Material 3 bottom-sheet corner radius
const UNKNOWN_IOS_RADIUS = 55; // newer full-screen iPhone we don't know yet

const compute = () => {
  if (Platform.OS === "android") return ANDROID_RADIUS;
  if (Platform.OS !== "ios") return 16;

  const byModel = BY_MODEL_ID[Device.modelId];
  if (byModel !== undefined) return byModel;

  const { width, height } = Dimensions.get("screen");
  const key = `${Math.round(Math.min(width, height))}x${Math.round(Math.max(width, height))}`;
  if (BY_SCREEN[key] !== undefined) return BY_SCREEN[key];

  // Home-button iPhones are 4:3-ish / 16:9; full-screen ones are taller than 2:1.
  return Math.max(width, height) / Math.min(width, height) > 2 ? UNKNOWN_IOS_RADIUS : 0;
};

let cached;
export const getDeviceCornerRadius = () => (cached ??= compute());
export const useDeviceCornerRadius = () => getDeviceCornerRadius();
