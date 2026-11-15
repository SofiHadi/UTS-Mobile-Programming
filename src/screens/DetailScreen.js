import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function DetailScreen({ route, navigation }) {
  const { transaksi, totalSaldo } = route.params;
  const isMasuk = transaksi.jenis === "pemasukan";

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View
          style={[
            styles.badge,
            isMasuk ? styles.badgeMasuk : styles.badgeKeluar,
          ]}
        >
          <Text style={styles.badgeText}>
            {isMasuk ? "PEMASUKAN" : "PENGELUARAN"}
          </Text>
        </View>

        <Text style={styles.judul}>{transaksi.judul}</Text>
        <Text
          style={[
            styles.nominal,
            isMasuk ? styles.textMasuk : styles.textKeluar,
          ]}
        >
          {isMasuk ? "+" : "-"} Rp {transaksi.nominal.toLocaleString("id-ID")}
        </Text>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.label}>ID Transaksi</Text>
          <Text style={styles.value}>#{transaksi.id}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Kategori</Text>
          <Text style={styles.value}>{transaksi.kategori}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Waktu Pencatatan</Text>
          <Text style={styles.value}>{transaksi.tanggal}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Sisa Saldo Saat Ini</Text>
          <Text style={styles.value}>
            Rp {totalSaldo.toLocaleString("id-ID")}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Kembali ke Halaman Utama</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    elevation: 3,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 12,
  },
  badgeMasuk: {
    backgroundColor: "#DCFCE7",
  },
  badgeKeluar: {
    backgroundColor: "#FEE2E2",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1E293B",
  },
  judul: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F172A",
  },
  nominal: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 8,
  },
  textMasuk: {
    color: "#10B981",
  },
  textKeluar: {
    color: "#EF4444",
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  label: {
    color: "#64748B",
    fontSize: 14,
  },
  value: {
    color: "#1E293B",
    fontSize: 14,
    fontWeight: "600",
  },
  backBtn: {
    marginTop: 20,
    backgroundColor: "#1E293B",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  backText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
});
