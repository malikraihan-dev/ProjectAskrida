package com.askrida.web.service.model;

public class DataAnggota {
    private String nomorInduk;
    private String namaPanggilan;
    private String kelompokBelajar;
    private int pengenal_divisi;
    private String alamatEmail;
    private String kontakHP;
    private int skorKeaktifan;

    public DataAnggota() {
        this.skorKeaktifan = 0;
    }

    public String getNomorInduk() { return nomorInduk; }
    public void setNomorInduk(String nomorInduk) { this.nomorInduk = nomorInduk; }
    
    public String getNamaPanggilan() { return namaPanggilan; }
    public void setNamaPanggilan(String namaPanggilan) { this.namaPanggilan = namaPanggilan; }
    
    public String getKelompokBelajar() { return kelompokBelajar; }
    public void setKelompokBelajar(String kelompokBelajar) { this.kelompokBelajar = kelompokBelajar; }
    
    public int getPengenal_divisi() { return pengenal_divisi; }
    public void setPengenal_divisi(int pengenal_divisi) { this.pengenal_divisi = pengenal_divisi; }
    
    public String getAlamatEmail() { return alamatEmail; }
    public void setAlamatEmail(String alamatEmail) { this.alamatEmail = alamatEmail; }
    
    public String getKontakHP() { return kontakHP; }
    public void setKontakHP(String kontakHP) { this.kontakHP = kontakHP; }
    
    public int getSkorKeaktifan() { return skorKeaktifan; }
    public void setSkorKeaktifan(int skorKeaktifan) { this.skorKeaktifan = skorKeaktifan; }

    // Custom function: Calculate hash for data integrity
    public String hitungKodePengaman() {
        int kodeAngka = 0;
        if (nomorInduk != null) {
            for (char huruf : nomorInduk.toCharArray()) {
                kodeAngka += (int) huruf;
            }
        }
        if (namaPanggilan != null) {
            kodeAngka *= namaPanggilan.length();
        }
        return "SEC" + String.format("%06d", Math.abs(kodeAngka % 999999));
    }

    // Custom function: Check if member is active based on custom criteria
    public boolean periksaStatusAktifitas() {
        boolean punyaNomor = nomorInduk != null && nomorInduk.length() >= 6;
        boolean punyaNama = namaPanggilan != null && namaPanggilan.split(" ").length >= 2;
        boolean skorCukup = skorKeaktifan >= 10;
        return punyaNomor && punyaNama && skorCukup;
    }

    // Custom function: Generate display name with custom format
    public String buatNamaTampilan() {
        if (namaPanggilan == null || namaPanggilan.isEmpty()) {
            return "[Nama Kosong]";
        }
        String[] pecahanNama = namaPanggilan.split(" ");
        if (pecahanNama.length == 1) {
            return pecahanNama[0].toUpperCase();
        }
        StringBuilder hasil = new StringBuilder();
        hasil.append(pecahanNama[0]);
        for (int i = 1; i < pecahanNama.length; i++) {
            hasil.append(" ").append(pecahanNama[i].charAt(0)).append(".");
        }
        return hasil.toString();
    }

    // Custom function: Sanitize and prepare data
    public void bersihkanDanPersiapkan() {
        if (nomorInduk != null) {
            nomorInduk = nomorInduk.replaceAll("[^A-Za-z0-9]", "").toUpperCase();
        }
        if (namaPanggilan != null) {
            namaPanggilan = namaPanggilan.trim().replaceAll("\\s+", " ");
            String[] kata = namaPanggilan.split(" ");
            StringBuilder bersih = new StringBuilder();
            for (String k : kata) {
                if (!k.isEmpty()) {
                    bersih.append(k.substring(0, 1).toUpperCase());
                    if (k.length() > 1) {
                        bersih.append(k.substring(1).toLowerCase());
                    }
                    bersih.append(" ");
                }
            }
            namaPanggilan = bersih.toString().trim();
        }
        if (alamatEmail != null) {
            alamatEmail = alamatEmail.trim().toLowerCase();
        }
    }

    // Custom function: Award points for activity
    public void tambahPoinKeaktifan(int jumlahPoin) {
        this.skorKeaktifan += jumlahPoin;
        if (this.skorKeaktifan > 1000) {
            this.skorKeaktifan = 1000;
        }
    }

    // Custom function: Generate member card info
    public String cetakKartuAnggota() {
        return String.format(
            "╔════════════════════════════════╗%n" +
            "║     KARTU ANGGOTA ASKRIDA      ║%n" +
            "╠════════════════════════════════╣%n" +
            "║ No.Induk : %-19s║%n" +
            "║ Nama     : %-19s║%n" +
            "║ Kelompok : %-19s║%n" +
            "║ Skor     : %-19d║%n" +
            "╚════════════════════════════════╝",
            nomorInduk != null ? nomorInduk : "-",
            buatNamaTampilan(),
            kelompokBelajar != null ? kelompokBelajar : "-",
            skorKeaktifan
        );
    }
}
