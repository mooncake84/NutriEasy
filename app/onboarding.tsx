// app/onboarding.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../src/constants/theme";
import { useUserStore } from "../src/store/useUserStore";

const REGIONS = [
  "Norte (Comarca Lagunera)",
  "Centro (CDMX / Edomex)",
  "Sur (Yucatán / Oaxaca)",
  "Occidente (Jalisco / Bajío)",
];

export default function OnboardingScreen() {
  const router = useRouter();
  const setUserData = useUserStore((state) => state.setUserData);

  const [name, setName] = useState("Aylin");
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);
  const [budget, setBudget] = useState("1200");

  const handleSaveAndGenerate = (): void => {
    if (!name.trim()) {
      Alert.alert("Campo requerido", "Por favor ingresa tu nombre.");
      return;
    }
    const numericBudget = parseFloat(budget);
    if (isNaN(numericBudget) || numericBudget <= 0) {
      Alert.alert(
        "Presupuesto inválido",
        "Por favor ingresa un monto semanal válido en pesos.",
      );
      return;
    }

    setUserData(name.trim(), selectedRegion, numericBudget);
    router.push("/home" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <View style={styles.iconCircle}>
              <Ionicons
                name="options-outline"
                size={36}
                color={COLORS.primaryGreen}
              />
            </View>
            <Text style={styles.title}>Configura tu Perfil</Text>
            <Text style={styles.subtitle}>
              Personaliza NutriEasy según tus datos y presupuesto regional para
              optimizar tus compras.
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Tu Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Aylin"
              placeholderTextColor={COLORS.grayText}
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>
              Selecciona tu Estado / Zona en México
            </Text>
            <View style={styles.regionsContainer}>
              {REGIONS.map((region) => {
                const isSelected = selectedRegion === region;
                return (
                  <Pressable
                    key={region}
                    style={[
                      styles.regionCard,
                      isSelected && styles.regionCardSelected,
                    ]}
                    onPress={() => setSelectedRegion(region)}
                  >
                    <Ionicons
                      name={isSelected ? "radio-button-on" : "radio-button-off"}
                      size={20}
                      color={isSelected ? COLORS.primaryGreen : COLORS.grayText}
                    />
                    <Text
                      style={[
                        styles.regionText,
                        isSelected && styles.regionTextSelected,
                      ]}
                    >
                      {region}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.label}>Presupuesto Semanal Máximo ($ MXN)</Text>
            <View style={styles.budgetInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.budgetInput}
                placeholder="1200"
                placeholderTextColor={COLORS.grayText}
                keyboardType="numeric"
                value={budget}
                onChangeText={setBudget}
              />
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
            onPress={handleSaveAndGenerate}
          >
            <Text style={styles.primaryButtonText}>Guardar y Generar Plan</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLightGray,
  },
  scrollContainer: {
    paddingHorizontal: SIZES.padding * 1.5,
    paddingVertical: SIZES.padding * 2,
    flexGrow: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.surfaceWhite,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.darkGreen,
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.grayText,
    textAlign: "center",
    lineHeight: 20,
  },
  formContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.mainText,
    marginBottom: 8,
    marginTop: 14,
  },
  input: {
    backgroundColor: COLORS.surfaceWhite,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.borderRadius,
    height: SIZES.minTouchTarget,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.mainText,
  },
  regionsContainer: {
    gap: 8,
  },
  regionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceWhite,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    gap: 12,
  },
  regionCardSelected: {
    borderColor: COLORS.primaryGreen,
    backgroundColor: "#E8F8F5",
  },
  regionText: {
    fontSize: 15,
    color: COLORS.mainText,
  },
  regionTextSelected: {
    fontWeight: "600",
    color: COLORS.darkGreen,
  },
  budgetInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceWhite,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.borderRadius,
    height: SIZES.minTouchTarget,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.darkGreen,
    marginRight: 8,
  },
  budgetInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.mainText,
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
