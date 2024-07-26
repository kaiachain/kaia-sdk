package org.web3j.utils;

import java.math.BigDecimal;

public class KaiaConvert {
    private KaiaConvert() {
    }

    // Kaia units
    public static BigDecimal fromPeb(String number, Unit unit) {
        return fromPeb(new BigDecimal(number), unit);
    }

    public static BigDecimal fromPeb(BigDecimal number, Unit unit) {
        return number.divide(unit.getpebFactor());
    }

    public static BigDecimal toPeb(String number, Unit unit) {
        return toPeb(new BigDecimal(number), unit);
    }

    public static BigDecimal toPeb(BigDecimal number, Unit unit) {
        return number.multiply(unit.getpebFactor());
    }

    // KAIA units
    public static BigDecimal fromKei(String number, Unit unit) {
        return fromKei(new BigDecimal(number), unit);
    }

    public static BigDecimal fromKei(BigDecimal number, Unit unit) {
        return number.divide(unit.getpebFactor());
    }

    public static BigDecimal toKei(String number, Unit unit) {
        return toKei(new BigDecimal(number), unit);
    }

    public static BigDecimal toKei(BigDecimal number, Unit unit) {
        return number.multiply(unit.getpebFactor());
    }

    public enum Unit {
        PEB("peb", 0),
        KPEB("kpeb", 3),
        MPEB("Mpeb", 6),
        GPEB("Gpeb", 9),
        STON("Ston", 9),
        uKLAY("uKLAY", 12),
        mKLAY("mKLAY", 15),
        KLAY("KLAY", 18),
        KKLAY("kKLAY", 21),
        MKLAY("MKLAY", 24),
        GKLAY("GKLAY", 27),
        KEI("kei", 0),
        GKEI("Gkei", 9),
        KAIA("KAIA", 18);

        private String name;
        private BigDecimal pebFactor;

        Unit(String name, int factor) {
            this.name = name;
            this.pebFactor = BigDecimal.TEN.pow(factor);
        }

        public BigDecimal getpebFactor() {
            return pebFactor;
        }

        @Override
        public String toString() {
            return name;
        }

        public static Unit fromString(String name) {
            if (name != null) {
                for (Unit unit : Unit.values()) {
                    if (name.equals(unit.name)) {
                        return unit;
                    }
                }
            }
            return Unit.valueOf(name);
        }
    }
}
