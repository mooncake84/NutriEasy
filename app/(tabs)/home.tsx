// app/(tabs)/home.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../src/constants/theme";
import { useUserStore } from "../../src/store/useUserStore";

export default function HomeScreen() {
  const router = useRouter();
  const { userName, budget, spent, region } = useUserStore();
  const [waterGlasses, setWaterGlasses] = useState<number>(4);

  const handleAddWater = () => {
    if (waterGlasses < 8) setWaterGlasses((prev) => prev + 1);
  };

  const handleRemoveWater = () => {
    if (waterGlasses > 0) setWaterGlasses((prev) => prev - 1);
  };

  const budgetPercentage = Math.min(Math.round((spent / budget) * 100), 100);
  const isOverBudget = spent > budget;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>¡Hola, {userName}!</Text>
            <Text style={styles.regionText}>📍 {region}</Text>
          </View>
          <Pressable
            style={styles.profileButton}
            onPress={() => router.push("/(tabs)/profile" as any)}
          >
            <Ionicons name="person" size={20} color={COLORS.primaryGreen} />
          </Pressable>
        </View>

        {/* Card Presupuesto */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Presupuesto Semanal</Text>
            <Text
              style={[styles.cardSubtitle, isOverBudget && styles.dangerText]}
            >
              ${spent} /${budget} MXN
            </Text>
          </View>

          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${budgetPercentage}%` },
                isOverBudget && styles.progressBarDanger,
              ]}
            />
          </View>
          <Text style={styles.progressInfo}>
            {isOverBudget
              ? "⚠️ Has superado tu presupuesto estimado."
              : `Te queda un margen saludable para esta semana (${100 - budgetPercentage}% disponible).`}
          </Text>
        </View>

        {/* Card Hidratación */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.row}>
              <Ionicons
                name="water"
                size={22}
                color="#3498DB"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.cardTitle}>Hidratación Diaria</Text>
            </View>
            <Text style={styles.waterCountText}>{waterGlasses} / 8 Vasos</Text>
          </View>

          <View style={styles.waterIconsRow}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((glassNum) => {
              const isActive = glassNum <= waterGlasses;
              return (
                <Ionicons
                  key={glassNum}
                  name={isActive ? "water" : "water-outline"}
                  size={28}
                  color={isActive ? "#3498DB" : COLORS.borderGray}
                />
              );
            })}
          </View>

          <View style={styles.waterButtonsRow}>
            <Pressable style={styles.waterButton} onPress={handleRemoveWater}>
              <Text style={styles.waterButtonText}>- Quitar</Text>
            </Pressable>
            <Pressable
              style={[styles.waterButton, styles.waterButtonAdd]}
              onPress={handleAddWater}
            >
              <Text style={styles.waterButtonAddText}>+ Tomar Vaso</Text>
            </Pressable>
          </View>
        </View>

        {/* Card Menú */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Menú Inteligente de Hoy</Text>
            <Pressable
              onPress={() => router.push("/(tabs)/grocery-list" as any)}
            >
              <Text style={styles.linkText}>Ver Lista →</Text>
            </Pressable>
          </View>

          <View style={styles.menuItem}>
            <View style={styles.mealBadge}>
              <Text style={styles.mealBadgeText}>Desayuno</Text>
            </View>
            <View style={styles.mealDetails}>
              <Text style={styles.mealTitle}>Avena con plátano y canela</Text>
              <Text style={styles.mealCost}>Económico • 320 kcal</Text>
            </View>
          </View>

          <View style={styles.menuItem}>
            <View style={[styles.mealBadge, { backgroundColor: "#E8F8F5" }]}>
              <Text style={[styles.mealBadgeText, { color: COLORS.darkGreen }]}>
                Comida
              </Text>
            </View>
            <View style={styles.mealDetails}>
              <Text style={styles.mealTitle}>
                Pechuga de pollo asada con ensalada
              </Text>
              <Text style={styles.mealCost}>Alto en Proteína • 540 kcal</Text>
            </View>
          </View>

          <View style={[styles.menuItem, { borderBottomWidth: 0 }]}>
            <View style={[styles.mealBadge, { backgroundColor: "#FEF9E7" }]}>
              <Text style={[styles.mealBadgeText, { color: "#D68910" }]}>
                Cena
              </Text>
            </View>
            <View style={styles.mealDetails}>
              <Text style={styles.mealTitle}>Tostadas horneadas de atún</Text>
              <Text style={styles.mealCost}>Saludable • 380 kcal</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    paddingTop: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.darkGreen,
  },
  regionText: {
    fontSize: 13,
    color: COLORS.grayText,
    marginTop: 2,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surfaceWhite,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.borderGray,
  },
  card: {
    backgroundColor: COLORS.surfaceWhite,
    borderRadius: SIZES.borderRadius,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.mainText,
  },
  cardSubtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.primaryGreen,
  },
  dangerText: {
    color: COLORS.alertDanger,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: COLORS.backgroundLightGray,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 5,
  },
  progressBarDanger: {
    backgroundColor: COLORS.alertDanger,
  },
  progressInfo: {
    fontSize: 12,
    color: COLORS.grayText,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  waterCountText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3498DB",
  },
  waterIconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  waterButtonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 4,
  },
  waterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
  },
  waterButtonText: {
    fontSize: 13,
    color: COLORS.grayText,
    fontWeight: "500",
  },
  waterButtonAdd: {
    backgroundColor: "#3498DB",
    borderColor: "#3498DB",
  },
  waterButtonAddText: {
    fontSize: 13,
    color: COLORS.surfaceWhite,
    fontWeight: "600",
  },
  linkText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primaryGreen,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundLightGray,
  },
  mealBadge: {
    backgroundColor: "#EAF2F8",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 12,
    alignItems: "center",
    width: 80,
  },
  mealBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2980B9",
  },
  mealDetails: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.mainText,
  },
  mealCost: {
    fontSize: 12,
    color: COLORS.grayText,
    marginTop: 2,
  },
});
