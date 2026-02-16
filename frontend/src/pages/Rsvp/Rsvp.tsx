import React, { useEffect, useState, useCallback } from "react";
import "./_rsvp.scss";
import { getRsvps } from "../../services/api";
import type { GuestType } from "../../types/guest";
import RsvpList from "../../components/RsvpList/RsvpList";
import RsvpForm from "../../components/RsvpForm/RsvpForm";
import Modal from "../../components/Modal/Modal";

/* Public RSVP page showing the guest list and a floating button to open the RSVP form */
const Rsvp: React.FC = () => {
  const [guests, setGuests] = useState<GuestType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  /* Fetches the public guest list from the API */
  const fetchGuests = useCallback(async () => {
    try {
      const data = await getRsvps();
      setGuests(data);
    } catch (error) {
      console.error("Failed to fetch RSVPs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  /* Load guests on mount */
  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  /* Called after successful form submission — refreshes list, keeps modal open for thank-you message */
  const handleSuccess = () => {
    fetchGuests();
  };

  /* Resets the form to a fresh state when the modal is closed and reopened */
  const handleClose = () => {
    setIsFormOpen(false);
    setFormKey((k) => k + 1);
  };

  return (
    <main className="rsvp-page">
      <h1 className="rsvp-page__title">RSVP</h1>
      <RsvpList guests={guests} loading={loading} />

      {/* Floating action button to open the RSVP form */}
      <button className="rsvp-page__fab" onClick={() => setIsFormOpen(true)}>
        RSVP
      </button>

      <Modal isOpen={isFormOpen} onClose={handleClose}>
        <h2 className="rsvp-page__modal-title">RSVP</h2>
        <RsvpForm key={formKey} onSuccess={handleSuccess} />
      </Modal>
    </main>
  );
};

export default Rsvp;
