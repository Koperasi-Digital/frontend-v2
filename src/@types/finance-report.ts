export type CoopNeracaData = {
  kas: number;
  asetTetap: number;
  aset: number;
  saldoMember: number;
  simpananSukarela: number;
  liabilitas: number;
  pendapatan: number;
  modal: number;
  beban: number;
  ekuitas: number;
};

export type CoopLabaRugiData = {
  jumlahSimpananPokok: number;
  jumlahSimpananWajib: number;
  jumlahBiayaLayanan: number;
  biayaSisaHasilUsaha: number;
  biayaOperasi: number;
  net: number;
};

export type CoopArusKasData = {
  jumlahKasAwal: number;
  kasMasuk: number;
  kasKeluar: number;
  jumlahKasAkhir: number;
};

export type NeracaData = {
  kas: number;
  persediaan: number;
  simpananSukarela: number;
  aset: number;
  pendapatan: number;
  modal: number;
  prive: number;
  beban: number;
  ekuitas: number;
};

export type LabaRugiData = {
  jumlahPenjualan: number;
  sisaHasilUsaha: number;
  biayaProduksiProdukTerjual: number;
  biayaSimpananPokok: number;
  biayaSimpananWajib: number;
  biayaOperasi: number;
  net: number;
};

export type ArusKasData = {
  jumlahKasAwal: number;
  kasMasuk: number;
  kasKeluar: number;
  jumlahKasAkhir: number;
};
