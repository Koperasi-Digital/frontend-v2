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
