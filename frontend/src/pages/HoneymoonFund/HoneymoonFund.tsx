import React, { useState, useCallback, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { copyToClipboard } from "../../services/clipboard";
import { getContributions } from "../../services/api";
import type { ContributionType } from "../../types/contribution";
import ContributionList from "../../components/ContributionList/ContributionList";
import ContributionForm from "../../components/ContributionForm/ContributionForm";
import Modal from "../../components/Modal/Modal";
import "./_honeymoon-fund.scss";

/* Bank transfer details displayed in the details modal and encoded in the QR code */
const BANK_DETAILS = [
  { label: "Account name", value: "Maximilian Crosby" },
  { label: "Sort code", value: "04-00-04" },
  { label: "Account number", value: "10943228" },
  { label: "IBAN", value: "GB31 MONZ 0400 0410 9432 28" },
  { label: "Reference", value: "Honeymoon" },
] as const;

/* QR code payload — encodes all bank details as readable plain text */
const QR_PAYLOAD = BANK_DETAILS.map((d) => `${d.label}: ${d.value}`).join(
  "\n"
);

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

/* Honeymoon fund page — guestbook wall with bank details in a modal */
const HoneymoonFund: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  /* Fetches all contributions from the API */
  const fetchContributions = useCallback(async () => {
    try {
      const data = await getContributions();
      setContributions(data);
    } catch (error) {
      console.error("Failed to fetch contributions:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  /* Load contributions on mount */
  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  /* Called after successful form submission — refreshes list */
  const handleFormSuccess = () => {
    fetchContributions();
  };

  /* Resets the form to a fresh state when the modal is closed and reopened */
  const handleFormClose = () => {
    setIsFormOpen(false);
    setFormKey((k) => k + 1);
  };

  return (
    <main className="honeymoon-fund">
      {/* Decorative page heading */}
      <h1 className="honeymoon-fund__heading">Honeymoon Fund</h1>

      {/* Warm introductory message */}
      <p className="honeymoon-fund__intro">
        Your presence at our wedding is the greatest gift we could ask for. If
        you would like to contribute towards our honeymoon, we would be truly
        grateful — but please know that it is entirely optional!
      </p>

      {/* Contribution guestbook list */}
      <ContributionList contributions={contributions} loading={loading} />

      {/* Fixed button — bank details modal (bottom-left) */}
      <button
        className="honeymoon-fund__details-btn"
        onClick={() => setIsDetailsOpen(true)}
      >
        Details
      </button>

      {/* Fixed button — leave a message (bottom-right) */}
      <button
        className="honeymoon-fund__fab"
        onClick={() => setIsFormOpen(true)}
      >
        Leave a Message
      </button>

      {/* Bank details modal */}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)}>
        <h2 className="honeymoon-fund__modal-title">Bank Transfer</h2>
        <section className="honeymoon-fund__details">
          {BANK_DETAILS.map((detail) => (
            <BankDetailRow
              key={detail.label}
              label={detail.label}
              value={detail.value}
            />
          ))}
        </section>
        <section className="honeymoon-fund__qr-section">
          <h2 className="honeymoon-fund__modal-subtitle">
            Scan to Save Details
          </h2>
          <QRCodeSVG
            value={QR_PAYLOAD}
            size={180}
            level="M"
            className="honeymoon-fund__qr"
          />
        </section>
      </Modal>

      {/* Contribution form modal */}
      <Modal isOpen={isFormOpen} onClose={handleFormClose}>
        <h2 className="honeymoon-fund__modal-title">Leave a Message</h2>
        <ContributionForm key={formKey} onSuccess={handleFormSuccess} />
      </Modal>
    </main>
  );
};

export default HoneymoonFund;
