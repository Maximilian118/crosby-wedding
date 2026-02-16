import React, { useEffect, useState, useCallback } from "react";
import "./_rsvpadmin.scss";
import { getRsvpsAdmin } from "../../services/api";
import type { GuestType } from "../../types/guest";
import RsvpList from "../../components/RsvpList/RsvpList";
import RsvpForm from "../../components/RsvpForm/RsvpForm";
import Modal from "../../components/Modal/Modal";

/* Admin RSVP page showing full guest details with click-to-view functionality */
const RsvpAdmin: React.FC = () => {
  const [guests, setGuests] = useState<GuestType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuest, setSelectedGuest] = useState<GuestType | null>(null);

  /* Fetches all RSVPs with full details */
  const fetchGuests = useCallback(async () => {
    try {
      const data = await getRsvpsAdmin();
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

  return (
    <main className="rsvp-admin-page">
      <h1 className="rsvp-admin-page__title">RSVP Admin</h1>
      <p className="rsvp-admin-page__count">
        Total: {guests.length} {guests.length === 1 ? "guest" : "guests"}
      </p>
      {/* Preference breakdowns */}
      <p className="rsvp-admin-page__stats">
        Vegetarian: {guests.filter((g) => g.vegetarian).length} | Car:{" "}
        {guests.filter((g) => g.car).length} | No Alcohol:{" "}
        {guests.filter((g) => g.noAlcohol).length}
      </p>
      <RsvpList guests={guests} loading={loading} isAdmin onGuestClick={setSelectedGuest} />

      {/* Modal showing read-only guest details when a list item is clicked */}
      <Modal
        isOpen={!!selectedGuest}
        onClose={() => setSelectedGuest(null)}
      >
        <h2 className="rsvp-admin-page__modal-title">
          {selectedGuest?.fullName}
        </h2>
        {selectedGuest && <RsvpForm readOnly initialData={selectedGuest} />}
      </Modal>
    </main>
  );
};

export default RsvpAdmin;
