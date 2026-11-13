// app/(tabs)/grocery-list.tsx
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../src/constants/theme";
import { useUserStore } from "../../src/store/useUserStore";

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  estimatedPrice: number;
  checked: boolean;
  quantity: string;
}

const INITIAL_GROCERY_ITEMS: GroceryItem[] = [
  {
    id: "1",
    name: "Plátanos (1 kg)",
    category: "Frutas y Verduras",
    estimatedPrice: 24,
    checked: true,
    quantity: "1 kg",
  },
  {
    id: "2",
    name: "Avena entera (500g)",
    category: "Abarrotes",
    estimatedPrice: 32,
    checked: true,
    quantity: "1 empaque",
  },
  {
    id: "3",
    name: "Pechuga de pollo (1 kg)",
    category: "Carnes",
    estimatedPrice: 135,
    checked: false,
    quantity: "1 kg",
  },
  {
    id: "4",
    name: "Leche descremada (1L)",
    category: "Lácteos",
    estimatedPrice: 28,
    checked: true,
    quantity: "2 litros",
  },
  {
    id: "5",
    name: "Huevos (Cono de 30)",
    category: "Abarrotes",
    estimatedPrice: 88,
    checked: false,
    quantity: "1 cono",
  },
  {
    id: "6",
    name: "Jitomate Saladette (1 kg)",
    category: "Frutas y Verduras",
    estimatedPrice: 30,
    checked: false,
    quantity: "1 kg",
  },
];

export default function GroceryListScreen() {
  const router = useRouter();
  const { budget, region } = useUserStore();
  const [items, setItems] = useState<GroceryItem[]>(INITIAL_GROCERY_ITEMS);

  const toggleCheckItem = (id: string): void => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const totalEstimated = useMemo(() => {
    return items.reduce((acc, item) => acc + item.estimatedPrice, 0);
  }, [items]);

  const isOverBudget = totalEstimated > budget;

  const handleFinishPurchase = (): void => {
    router.push("/confirmation" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerCard}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Lista de Supermercado</Text>
          <View
            style={[
              styles.badge,
              isOverBudget ? styles.badgeDanger : styles.badgeSuccess,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                isOverBudget ? styles.badgeTextDanger : styles.badgeTextSuccess,
              ]}
            >
              {isOverBudget ? "Excede Presupuesto" : "Dentro del Límite"}
            </Text>
          </View>
        </View>

        <Text style={styles.regionSubtext}>
          Ajustado a precios de: {region}
        </Text>

        <View style={styles.priceSummaryRow}>
          <View>
            <Text style={styles.priceLabel}>Presupuesto Semanal</Text>
            <Text style={styles.priceValue}>${budget} MXN</Text>
          </View>
          <View style={styles.dividerVertical} />
          <View>
            <Text style={styles.priceLabel}>Costo Estimado</Text>
            <Text
              style={[styles.priceValue, isOverBudget && styles.dangerText]}
            >
              ${totalEstimated} MXN
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.itemCard, item.checked && styles.itemCardChecked]}
            onPress={() => toggleCheckItem(item.id)}
          >
            <Ionicons
              name={item.checked ? "checkbox" : "square-outline"}
              size={24}
              color={item.checked ? COLORS.primaryGreen : COLORS.grayText}
            />
            <View style={styles.itemDetails}>
              <Text
                style={[
                  styles.itemName,
                  item.checked && styles.itemNameChecked,
                ]}
              >
                {item.name}
              </Text>
              <Text style={styles.itemCategory}>
                {item.category} • {item.quantity}
              </Text>
            </View>
            <Text
              style={[
                styles.itemPrice,
                item.checked && styles.itemPriceChecked,
              ]}
            >
              ${item.estimatedPrice} MXN
            </Text>
          </Pressable>
        )}
      />

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
          onPress={handleFinishPurchase}
        >
          <Text style={styles.primaryButtonText}>Finalizar Compra</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLightGray,
  },
  headerCard: {
    backgroundColor: COLORS.surfaceWhite,
    paddingHorizontal: SIZES.padding * 1.2,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderGray,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.darkGreen,
  },
  regionSubtext: {
    fontSize: 12,
    color: COLORS.grayText,
    marginTop: 2,
    marginBottom: 12,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeSuccess: {
    backgroundColor: "#E8F8F5",
  },
  badgeDanger: {
    backgroundColor: "#FDEDEC",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  badgeTextSuccess: {
    color: COLORS.darkGreen,
  },
  badgeTextDanger: {
    color: COLORS.alertDanger,
  },
  priceSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.backgroundLightGray,
    paddingVertical: 10,
    borderRadius: SIZES.borderRadius,
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.grayText,
    textAlign: "center",
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.mainText,
    textAlign: "center",
    marginTop: 2,
  },
  dividerVertical: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.borderGray,
  },
  dangerText: {
    color: COLORS.alertDanger,
  },
  listContainer: {
    paddingHorizontal: SIZES.padding * 1.2,
    paddingVertical: 16,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceWhite,
    padding: 14,
    borderRadius: SIZES.borderRadius,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
  },
  itemCardChecked: {
    backgroundColor: "#F9FBF9",
    borderColor: "#D5F5E3",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.mainText,
  },
  itemNameChecked: {
    textDecorationLine: "line-through",
    color: COLORS.grayText,
  },
  itemCategory: {
    fontSize: 12,
    color: COLORS.grayText,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.darkGreen,
  },
  itemPriceChecked: {
    color: COLORS.grayText,
  },
  footer: {
    backgroundColor: COLORS.surfaceWhite,
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderGray,
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
