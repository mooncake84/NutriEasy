// app/(tabs)/profile.tsx
import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../src/constants/theme";
import { useUserStore } from "../../src/store/useUserStore";

export default function ProfileScreen() {
  const router = useRouter();
  const { userName, region, budget } = useUserStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{userName}</Text>

          <Text style={styles.label}>Región:</Text>
          <Text style={styles.value}>{region}</Text>

          <Text style={styles.label}>Presupuesto Semanal:</Text>
          <Text style={styles.value}>${budget} MXN</Text>
        </View>

        <Pressable
          style={styles.button}
          onPress={() => router.push("/onboarding" as any)}
        >
          <Text style={styles.buttonText}>Editar Preferencias</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLightGray,
    padding: SIZES.padding * 1.5,
    justifyContent: "center",
  },
  content: { flex: 1, justifyContent: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.darkGreen,
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: COLORS.surfaceWhite,
    borderRadius: SIZES.borderRadius,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  label: { fontSize: 14, color: COLORS.grayText, marginTop: 10 },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.mainText,
    marginTop: 2,
  },
  button: {
    backgroundColor: COLORS.primaryGreen,
    height: SIZES.minTouchTarget,
    borderRadius: SIZES.borderRadius,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: COLORS.surfaceWhite, fontSize: 16, fontWeight: "600" },
});
