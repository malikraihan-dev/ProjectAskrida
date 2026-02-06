package com.askrida.web.service.model;

import java.util.HashMap;
import java.util.Map;

public class UnitDivisi {
    private int kodeUnit;
    private String labelUnit;
    private String deskripsiSingkat;
    private boolean statusOperasional;
    private Map<String, Object> metadataUnit;

    public UnitDivisi() {
        this.statusOperasional = true;
        this.metadataUnit = new HashMap<>();
    }

    public int getKodeUnit() { return kodeUnit; }
    public void setKodeUnit(int kodeUnit) { this.kodeUnit = kodeUnit; }
    
    public String getLabelUnit() { return labelUnit; }
    public void setLabelUnit(String labelUnit) { this.labelUnit = labelUnit; }
    
    public String getDeskripsiSingkat() { return deskripsiSingkat; }
    public void setDeskripsiSingkat(String deskripsiSingkat) { this.deskripsiSingkat = deskripsiSingkat; }
    
    public boolean isStatusOperasional() { return statusOperasional; }
    public void setStatusOperasional(boolean statusOperasional) { this.statusOperasional = statusOperasional; }
    
    public Map<String, Object> getMetadataUnit() { return metadataUnit; }
    public void setMetadataUnit(Map<String, Object> metadataUnit) { this.metadataUnit = metadataUnit; }

    // Custom function: Toggle operational status
    public void alihkanStatusOperasi() {
        this.statusOperasional = !this.statusOperasional;
    }

    // Custom function: Generate unit code with checksum
    public String generasiKodeUnitDenganChecksum() {
        int angkaChecksum = kodeUnit * 7 + labelUnit.length() * 3;
        return String.format("DIV-%03d-%02d", kodeUnit, angkaChecksum % 100);
    }

    // Custom function: Add metadata entry
    public void tambahInformasiMetadata(String kunci, Object nilai) {
        if (metadataUnit == null) {
            metadataUnit = new HashMap<>();
        }
        metadataUnit.put(kunci, nilai);
    }

    // Custom function: Build info summary with custom format
    public String ringkasanInformasi() {
        StringBuilder info = new StringBuilder();
        info.append("▶ Unit: ").append(labelUnit != null ? labelUnit : "Tidak Diketahui");
        info.append(" | Kode: ").append(kodeUnit);
        info.append(" | Status: ").append(statusOperasional ? "✓ Operasional" : "✗ Nonaktif");
        if (deskripsiSingkat != null && !deskripsiSingkat.isEmpty()) {
            info.append("\n  └─ ").append(deskripsiSingkat);
        }
        return info.toString();
    }

    // Custom function: Validate unit requirements
    public boolean validasiPersyaratanUnit() {
        boolean punyaKode = kodeUnit > 0;
        boolean punyaLabel = labelUnit != null && labelUnit.length() >= 3 && labelUnit.length() <= 50;
        return punyaKode && punyaLabel;
    }

    // Custom function: Calculate unit rating based on custom criteria
    public int hitungRatingUnit() {
        int rating = 50;
        if (labelUnit != null && labelUnit.length() > 10) rating += 10;
        if (deskripsiSingkat != null && !deskripsiSingkat.isEmpty()) rating += 15;
        if (statusOperasional) rating += 25;
        if (metadataUnit != null && !metadataUnit.isEmpty()) {
            rating += Math.min(metadataUnit.size() * 5, 20);
        }
        return Math.min(rating, 100);
    }
}
