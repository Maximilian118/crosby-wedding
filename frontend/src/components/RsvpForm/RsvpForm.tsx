import React, { useState } from "react";
import "./_rsvpform.scss";
import { submitRsvp } from "../../services/api";
import type { CreateRsvpBody, GuestType } from "../../types/guest";

interface RsvpFormProps {
  onSuccess?: () => void;
  readOnly?: boolean;
  initialData?: GuestType;
}

/* RSVP form for submitting guest details or viewing them in read-only mode */
const RsvpForm: React.FC<RsvpFormProps> = ({
  onSuccess,
  readOnly = false,
  initialData,
}) => {
  const [fullName, setFullName] = useState(initialData?.fullName || "");
  const [vegetarian, setVegetarian] = useState(
    initialData?.vegetarian || false
  );
  const [car, setCar] = useState(initialData?.car || false);
  const [noAlcohol, setNoAlcohol] = useState(initialData?.noAlcohol || false);
  const [comments, setComments] = useState(initialData?.comments || "");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  /* Handles form submission by sending data to the backend */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (readOnly) return;

    setSubmitting(true);
    setError("");

    const data: CreateRsvpBody = {
      fullName,
      vegetarian,
      car,
      noAlcohol,
      comments,
    };

    try {
      await submitRsvp(data);
      setFullName("");
      setVegetarian(false);
      setCar(false);
      setNoAlcohol(false);
      setComments("");
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
      <div className="rsvp-form__success">
        <h2 className="rsvp-form__success-title">Thank you!</h2>
        <p className="rsvp-form__success-desc">We look forward seeing you!</p>
      </div>
    );
  }

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      {/* Notice explaining how to fill out the form */}
      {!readOnly && (
        <p className="rsvp-form__notice">
          Please fill out this form for each person attending individually, not
          as a group. Only tick the <strong>Car</strong> box if you are the main
          driver of the vehicle.
        </p>
      )}

      {/* Full name input */}
      <div className="rsvp-form__field">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={readOnly}
          required
        />
      </div>

      {/* Preference checkboxes */}
      <div className="rsvp-form__checkboxes">
        <label className="rsvp-form__checkbox">
          <input
            type="checkbox"
            checked={vegetarian}
            onChange={(e) => setVegetarian(e.target.checked)}
            disabled={readOnly}
          />
          Vegetarian
        </label>
        <label className="rsvp-form__checkbox">
          <input
            type="checkbox"
            checked={car}
            onChange={(e) => setCar(e.target.checked)}
            disabled={readOnly}
          />
          Car
        </label>
        <label className="rsvp-form__checkbox">
          <input
            type="checkbox"
            checked={noAlcohol}
            onChange={(e) => setNoAlcohol(e.target.checked)}
            disabled={readOnly}
          />
          No Alcohol
        </label>
      </div>

      {/* Comments textarea */}
      <div className="rsvp-form__field">
        <label htmlFor="comments">Comments</label>
        <textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Any requests or requirements?"
          disabled={readOnly}
          rows={4}
        />
      </div>

      {/* Error message */}
      {error && <p className="rsvp-form__error">{error}</p>}

      {/* Submit button (hidden in read-only mode) */}
      {!readOnly && (
        <button
          type="submit"
          className="rsvp-form__submit"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit RSVP"}
        </button>
      )}
    </form>
  );
};

export default RsvpForm;
