import React, { useState } from "react";
import "./_contributionform.scss";
import { submitContribution } from "../../services/api";
import type { CreateContributionBody } from "../../types/contribution";

interface ContributionFormProps {
  onSuccess?: () => void;
}

/* Form for submitting a honeymoon fund contribution with name, optional amount, and message */
const ContributionForm: React.FC<ContributionFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  /* Handles form submission by sending data to the backend */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const data: CreateContributionBody = {
      name,
      message,
      amount: amount ? parseFloat(amount) : undefined,
    };

    try {
      await submitContribution(data);
      setName("");
      setAmount("");
      setMessage("");
      setSubmitted(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  /* Show thank-you message after successful submission */
  if (submitted) {
    return (
      <div className="contribution-form__success">
        <h2 className="contribution-form__success-title">Thank you!</h2>
        <p className="contribution-form__success-desc">
          Your kind message has been added.
        </p>
      </div>
    );
  }

  return (
    <form className="contribution-form" onSubmit={handleSubmit}>
      {/* Name input */}
      <div className="contribution-form__field">
        <label htmlFor="contribution-name">Name</label>
        <input
          id="contribution-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Optional amount input */}
      <div className="contribution-form__field">
        <label htmlFor="contribution-amount">Amount (optional)</label>
        <div className="contribution-form__amount-wrapper">
          <span className="contribution-form__currency">£</span>
          <input
            id="contribution-amount"
            type="number"
            min="0"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Message textarea */}
      <div className="contribution-form__field">
        <label htmlFor="contribution-message">Message</label>
        <textarea
          id="contribution-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Leave a message for the happy couple..."
          rows={4}
          required
        />
      </div>

      {/* Error message */}
      {error && <p className="contribution-form__error">{error}</p>}

      {/* Submit button */}
      <button
        type="submit"
        className="contribution-form__submit"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default ContributionForm;
