/**
 * Format a number as Vietnamese Dong (VND) currency.
 * Used in TransferPage.
 */
export const fmtVND = (n: number): string =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

/**
 * Format a plain number with vi-VN locale (no currency symbol).
 */
export const fmtNum = (n: number): string =>
    new Intl.NumberFormat("vi-VN").format(n);
