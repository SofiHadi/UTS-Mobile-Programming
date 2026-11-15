import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const KATEGORI_LIST = ["Makan", "Kuliah", "Transport", "Tabungan"];

export default function FormTransaksi({ onTambahTransaksi }) {
  const [judul, setJudul] = useState("");
  const [nominal, setNominal] = useState("");
  const [jenis, setJenis] = useState("pengeluaran");
  const [kategori, setKategori] = useState("Makan");

  const handleSimpan = () => {
    const angkaNominal = parseInt(nominal.replace(/[^0-9]/g, ""), 10);

    if (!judul.trim() || isNaN(angkaNominal) || angkaNominal <= 0) {
      Alert.alert(
        "Input Tidak Valid",
        "Masukkan keterangan dan nominal angka yang benar.",
      );
      return;
    }

    const transaksiBaru = {
      id: Date.now().toString(),
      judul: judul.trim(),
      nominal: angkaNominal,
      jenis,
      kategori: jenis === "pemasukan" ? "Pemasukan" : kategori,
      tanggal: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    onTambahTransaksi(transaksiBaru);
    setJudul("");
    setNominal("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catat Transaksi Baru</Text>

      <View style={styles.jenisRow}>
        <TouchableOpacity
          style={[
            styles.jenisBtn,
            jenis === "pengeluaran" && styles.btnKeluarAktif,
          ]}
          onPress={() => setJenis("pengeluaran")}
        >
          <Text
            style={[
              styles.jenisText,
              jenis === "pengeluaran" && styles.textAktif,
            ]}
          >
            Pengeluaran
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.jenisBtn,
            jenis === "pemasukan" && styles.btnMasukAktif,
          ]}
          onPress={() => setJenis("pemasukan")}
        >
          <Text
            style={[
              styles.jenisText,
              jenis === "pemasukan" && styles.textAktif,
            ]}
          >
            Pemasukan
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Keterangan (misal: Makan Siang / Print Tugas)"
        value={judul}
        onChangeText={setJudul}
      />

      <TextInput
        style={styles.input}
        placeholder="Nominal Rp (misal: 15000)"
        keyboardType="numeric"
        value={nominal}
        onChangeText={setNominal}
      />

      {jenis === "pengeluaran" && (
        <View style={styles.kategoriRow}>
          {KATEGORI_LIST.map((kat) => (
            <TouchableOpacity
              key={kat}
              style={[styles.katChip, kategori === kat && styles.katChipAktif]}
              onPress={() => setKategori(kat)}
            >
              <Text
                style={[
                  styles.katText,
                  kategori === kat && styles.katTextAktif,
                ]}
              >
                {kat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.submitBtn} onPress={handleSimpan}>
        <Text style={styles.submitText}>+ Simpan Transaksi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 12,
  },
  jenisRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  jenisBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
  },
  btnKeluarAktif: {
    backgroundColor: "#EF4444",
  },
  btnMasukAktif: {
    backgroundColor: "#10B981",
  },
  jenisText: {
    fontWeight: "600",
    color: "#475569",
  },
  textAktif: {
    color: "#FFFFFF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 14,
    backgroundColor: "#F8FAFC",
  },
  kategoriRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  katChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#E2E8F0",
  },
  katChipAktif: {
    backgroundColor: "#2563EB",
  },
  katText: {
    fontSize: 12,
    color: "#334155",
  },
  katTextAktif: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  submitBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
});
