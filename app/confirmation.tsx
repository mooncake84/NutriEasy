// app/confirmation.tsx
import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../src/constants/theme";
import { useUserStore } from "../src/store/useUserStore";

export default function ConfirmationScreen() {
  const router = useRouter();
  const { region } = useUserStore();

  const handleReturnHome = (): void => {
    router.replace("/(tabs)/home" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons
            name="checkmark-circle"
            size={96}
            color={COLORS.primaryGreen}
          />
        </View>

        <Text style={styles.title}>¡Lista completada con éxito!</Text>
        <Text style={styles.subtitle}>
          Tu compra ha sido optimizada dentro de tu presupuesto para la zona:
        </Text>
        <Text style={styles.regionBadge}>📍 {region}</Text>

        <View style={styles.summaryCard}>
          <Ionicons
            name="sparkles-outline"
            size={28}
            color={COLORS.darkGreen}
          />
          <View style={styles.summaryTextContainer}>
            <Text style={styles.summaryTitle}>Ahorro Estimado Alcanzado</Text>
            <Text style={styles.summaryAmount}>~$220.00 MXN ahorrados</Text>
            <Text style={styles.summaryDesc}>
              Gracias a la selección de ingredientes locales y precios
              regionales de NutriEasy.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable
          style={({ pressed }: { pressed: boolean }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
          onPress={handleReturnHome}
        >
          <Text style={styles.primaryButtonText}>Volver al Inicio</Text>
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
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.mainText,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.grayText,
    textAlign: "center",
    lineHeight: 22,
  },
  regionBadge: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.darkGreen,
    marginTop: 6,
    marginBottom: 24,
  },
  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceWhite,
    padding: 16,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    width: "100%",
    elevation: 2,
  },
  summaryTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  summaryTitle: {
    fontSize: 13,
    color: COLORS.grayText,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.darkGreen,
    marginVertical: 2,
  },
  summaryDesc: {
    fontSize: 12,
    color: COLORS.grayText,
    lineHeight: 16,
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
