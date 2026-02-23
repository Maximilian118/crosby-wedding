import React, { useState, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { copyToClipboard } from "../../services/clipboard";
import "./_honeymoon-fund.scss";

/* Bank transfer details displayed on the page and encoded in the QR code */
const BANK_DETAILS = [
  { label: "Account name", value: "Maximilian Crosby" },
  { label: "Sort code", value: "04-00-04" },
  { label: "Account number", value: "10943228" },
  { label: "IBAN", value: "GB31 MONZ 0400 0410 9432 28" },
  { label: "Reference", value: "Honeymoon" },
] as const;

/* QR code payload — encodes all bank details as readable plain text */
const QR_PAYLOAD = BANK_DETAILS.map((d) => `${d.label}: ${d.value}`).join("\n");

/* Individual bank detail row with copy-to-clipboard functionality */
const BankDetailRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  const [copied, setCopied] = useState(false);

  /* Copies the value to clipboard and shows a brief confirmation */
  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(value);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [value]);

  return (
    <div className="honeymoon-fund__detail">
      <span className="honeymoon-fund__label">{label}</span>
      <div className="honeymoon-fund__value-group">
        <span className="honeymoon-fund__value">{value}</span>
        <button
          className={`honeymoon-fund__copy-btn${copied ? " honeymoon-fund__copy-btn--copied" : ""}`}
          onClick={handleCopy}
          aria-label={`Copy ${label}`}
          type="button"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
};

/* Honeymoon fund page — displays a warm message, bank transfer details, and QR code */
const HoneymoonFund: React.FC = () => (
  <main className="honeymoon-fund">
    {/* Decorative page heading */}
    <h1 className="honeymoon-fund__heading">Honeymoon Fund</h1>

    {/* Warm introductory message */}
    <p className="honeymoon-fund__intro">
      Your presence at our wedding is the greatest gift we could ask for. If you
      would like to contribute towards our honeymoon, we would be truly grateful
      — but please know that it is entirely optional!
    </p>

    {/* Bank transfer details with copy buttons */}
    <section className="honeymoon-fund__details">
      <h2 className="honeymoon-fund__subheading">Bank Transfer</h2>
      {BANK_DETAILS.map((detail) => (
        <BankDetailRow
          key={detail.label}
          label={detail.label}
          value={detail.value}
        />
      ))}
    </section>

    {/* QR code encoding the bank transfer details */}
    <section className="honeymoon-fund__qr-section">
      <h2 className="honeymoon-fund__subheading">Scan to Save Details</h2>
      <QRCodeSVG
        value={QR_PAYLOAD}
        size={180}
        level="M"
        className="honeymoon-fund__qr"
      />
    </section>
  </main>
);

export default HoneymoonFund;
