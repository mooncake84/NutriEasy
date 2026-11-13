// app/index.tsx
import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../src/constants/theme";

export default function WelcomeScreen() {
  const router = useRouter();

  const handleStart = (): void => {
    router.push("/onboarding" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Ícono Ilustrativo */}
        <View style={styles.iconContainer}>
          <Ionicons name="leaf" size={80} color={COLORS.primaryGreen} />
        </View>

        {/* Textos Principales */}
        <Text style={styles.title}>NutriEasy</Text>
        <Text style={styles.subtitle}>
          Nutrición inteligente y presupuesto accesible adaptado a los precios
          de tu región en México.
        </Text>
      </View>

      {/* Botón de Entrada Principal */}
      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
          onPress={handleStart}
        >
          <Text style={styles.primaryButtonText}>Comenzar Plan Semanal</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLightGray,
    justifyContent: "space-between",
    paddingHorizontal: SIZES.padding * 1.5,
    paddingVertical: SIZES.padding * 2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: COLORS.surfaceWhite,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.darkGreen,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.mainText,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 12,
  },
  footer: {
    width: "100%",
  },
  primaryButton: {
    backgroundColor: COLORS.primaryGreen,
    height: SIZES.minTouchTarget,
    borderRadius: SIZES.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonPressed: {
    backgroundColor: "#27ae60",
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    color: COLORS.surfaceWhite,
    fontSize: 16,
    fontWeight: "600",
  },
});
