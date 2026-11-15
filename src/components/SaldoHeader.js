import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SaldoHeader({
  saldo,
  pemasukan,
  pengeluaran,
  tipsHemat,
}) {
  const formatRupiah = (angka) => {
    return "Rp " + angka.toLocaleString("id-ID");
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Sisa Saldo Mahasiswa</Text>
      <Text style={[styles.saldoText, saldo < 50000 && styles.saldoKritis]}>
        {formatRupiah(saldo)}
      </Text>

      <View style={styles.row}>
        <View style={styles.boxMasuk}>
          <Text style={styles.subLabel}>Pemasukan</Text>
          <Text style={styles.angkaMasuk}>+ {formatRupiah(pemasukan)}</Text>
        </View>
        <View style={styles.boxKeluar}>
          <Text style={styles.subLabel}>Pengeluaran</Text>
          <Text style={styles.angkaKeluar}>- {formatRupiah(pengeluaran)}</Text>
        </View>
      </View>

      <View style={styles.tipsBox}>
        <Text style={styles.tipsText}>💡 {tipsHemat}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
  },
  label: {
    color: "#94A3B8",
    fontSize: 14,
  },
  saldoText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 6,
  },
  saldoKritis: {
    color: "#FCA5A5",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 10,
  },
  boxMasuk: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 12,
    borderRadius: 10,
  },
  boxKeluar: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 12,
    borderRadius: 10,
  },
  subLabel: {
    color: "#94A3B8",
    fontSize: 12,
  },
  angkaMasuk: {
    color: "#4ADE80",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 4,
  },
  angkaKeluar: {
    color: "#F87171",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 4,
  },
  tipsBox: {
    marginTop: 14,
    backgroundColor: "#334155",
    padding: 10,
    borderRadius: 8,
  },
  tipsText: {
    color: "#E2E8F0",
    fontSize: 12,
    lineHeight: 18,
  },
});
