import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ItemTransaksi({ item, onHapus, onPressDetail }) {
  const isMasuk = item.jenis === "pemasukan";

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPressDetail(item)}>
      <View style={styles.info}>
        <Text style={styles.judul}>{item.judul}</Text>
        <Text style={styles.meta}>
          {item.kategori} • {item.tanggal}
        </Text>
      </View>

      <View style={styles.kanan}>
        <Text style={[styles.nominal, isMasuk ? styles.masuk : styles.keluar]}>
          {isMasuk ? "+" : "-"} Rp {item.nominal.toLocaleString("id-ID")}
        </Text>
        <TouchableOpacity
          onPress={() => onHapus(item.id)}
          style={styles.hapusBtn}
        >
          <Text style={styles.hapusText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
  },
  info: {
    flex: 1,
    paddingRight: 10,
  },
  judul: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1E293B",
  },
  meta: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },
  kanan: {
    alignItems: "flex-end",
  },
  nominal: {
    fontSize: 14,
    fontWeight: "bold",
  },
  masuk: {
    color: "#10B981",
  },
  keluar: {
    color: "#EF4444",
  },
  hapusBtn: {
    marginTop: 6,
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  hapusText: {
    color: "#DC2626",
    fontSize: 11,
    fontWeight: "600",
  },
});
