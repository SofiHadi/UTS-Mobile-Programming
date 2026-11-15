import React, { useState, useEffect, useMemo } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import SaldoHeader from "../components/SaldoHeader";
import FormTransaksi from "../components/FormTransaksi";
import FilterKategori from "../components/FilterKategori";
import ItemTransaksi from "../components/ItemTransaksi";

const DATA_AWAL = [
  {
    id: "1",
    judul: "Uang Saku Mingguan",
    nominal: 350000,
    jenis: "pemasukan",
    kategori: "Pemasukan",
    tanggal: "15 Nov 2026, 08:00",
  },
  {
    id: "2",
    judul: "Fotokopi & Jilid Laporan Praktikum",
    nominal: 25000,
    jenis: "pengeluaran",
    kategori: "Kuliah",
    tanggal: "15 Nov 2026, 10:30",
  },
  {
    id: "3",
    judul: "Makan Siang Warteg Kampus",
    nominal: 15000,
    jenis: "pengeluaran",
    kategori: "Makan",
    tanggal: "15 Nov 2026, 12:15",
  },
];

export default function HomeScreen({ navigation }) {
  const [transaksiList, setTransaksiList] = useState(DATA_AWAL);
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [tipsHemat, setTipsHemat] = useState("");

  // Hook useMemo: menghitung total pemasukan, pengeluaran, dan sisa saldo
  const { pemasukan, pengeluaran, saldo } = useMemo(() => {
    let totalMasuk = 0;
    let totalKeluar = 0;

    transaksiList.forEach((item) => {
      if (item.jenis === "pemasukan") {
        totalMasuk += item.nominal;
      } else {
        totalKeluar += item.nominal;
      }
    });

    return {
      pemasukan: totalMasuk,
      pengeluaran: totalKeluar,
      saldo: totalMasuk - totalKeluar,
    };
  }, [transaksiList]);

  // Hook useEffect: memperbarui saran keuangan setiap kali saldo berubah
  useEffect(() => {
    if (saldo <= 0) {
      setTipsHemat("Peringatan: Saldo habis! Tunda pengeluaran non-prioritas.");
    } else if (saldo < 50000) {
      setTipsHemat(
        "Saldo menipis di bawah Rp 50.000. Utamakan kebutuhan kuliah & makan.",
      );
    } else if (pengeluaran > pemasukan * 0.7) {
      setTipsHemat(
        "Pengeluaran sudah melebihi 70% pemasukan. Mulai rem jajan harian.",
      );
    } else {
      setTipsHemat(
        "Keuangan terkendali. Sisihkan minimal 10% untuk dana darurat.",
      );
    }
  }, [saldo, pemasukan, pengeluaran]);

  // Hook useMemo: memfilter daftar transaksi sesuai kategori terpilih
  const dataTersaring = useMemo(() => {
    if (filterKategori === "Semua") return transaksiList;
    return transaksiList.filter((item) => item.kategori === filterKategori);
  }, [transaksiList, filterKategori]);

  const tambahTransaksi = (transaksiBaru) => {
    setTransaksiList((prev) => [transaksiBaru, ...prev]);
  };

  const hapusTransaksi = (id) => {
    setTransaksiList((prev) => prev.filter((item) => item.id !== id));
  };

  const bukaDetail = (item) => {
    navigation.navigate("Detail", {
      transaksi: item,
      totalSaldo: saldo,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dataTersaring}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <SaldoHeader
              saldo={saldo}
              pemasukan={pemasukan}
              pengeluaran={pengeluaran}
              tipsHemat={tipsHemat}
            />
            <FormTransaksi onTambahTransaksi={tambahTransaksi} />
            <Text style={styles.sectionTitle}>
              Riwayat Transaksi (Ketuk untuk Detail)
            </Text>
            <FilterKategori
              kategoriAktif={filterKategori}
              onPilihKategori={setFilterKategori}
            />
          </>
        }
        renderItem={({ item }) => (
          <ItemTransaksi
            item={item}
            onHapus={hapusTransaksi}
            onPressDetail={bukaDetail}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.kosongText}>
            Belum ada transaksi pada kategori ini.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 10,
  },
  kosongText: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 20,
    marginBottom: 40,
  },
});
