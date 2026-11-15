import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";

const DAFTAR_FILTER = [
  "Semua",
  "Pemasukan",
  "Makan",
  "Kuliah",
  "Transport",
  "Tabungan",
];

export default function FilterKategori({ kategoriAktif, onPilihKategori }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.wrapper}
    >
      {DAFTAR_FILTER.map((item) => {
        const aktif = kategoriAktif === item;
        return (
          <TouchableOpacity
            key={item}
            style={[styles.chip, aktif && styles.chipAktif]}
            onPress={() => onPilihKategori(item)}
          >
            <Text style={[styles.text, aktif && styles.textAktif]}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E2E8F0",
    marginRight: 8,
  },
  chipAktif: {
    backgroundColor: "#1E293B",
  },
  text: {
    fontSize: 13,
    color: "#334155",
    fontWeight: "500",
  },
  textAktif: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
