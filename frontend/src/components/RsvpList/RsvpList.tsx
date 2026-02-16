import React from "react";
import "./_rsvplist.scss";
import type { GuestType } from "../../types/guest";
import Spinner from "../Spinner/Spinner";

interface RsvpListProps {
  guests: GuestType[];
  loading?: boolean;
  isAdmin?: boolean;
  onGuestClick?: (guest: GuestType) => void;
}

/* Renders a list of RSVP'd guests — in admin mode, shows preferences alongside names */
const RsvpList: React.FC<RsvpListProps> = ({
  guests,
  loading = false,
  isAdmin = false,
  onGuestClick,
}) => {
  if (loading) {
    return <Spinner />;
  }

  if (guests.length === 0) {
    return <p className="rsvp-list__empty">No RSVPs yet. Be the first!</p>;
  }

  return (
    <ul className="rsvp-list">
      {guests.map((guest) => (
        <li
          key={guest._id}
          className={`rsvp-list__item ${isAdmin ? "rsvp-list__item--admin" : ""}`}
          onClick={() => isAdmin && onGuestClick?.(guest)}
        >
          <span className="rsvp-list__name">{guest.fullName}</span>

          {/* Admin view: show preference tags on the right */}
          {isAdmin && (
            <span className="rsvp-list__prefs">
              {guest.vegetarian && <span className="pref-tag pref-tag--vegetarian">Vegetarian</span>}
              {guest.car && <span className="pref-tag pref-tag--car">Car</span>}
              {guest.noAlcohol && <span className="pref-tag pref-tag--no-alcohol">No Alcohol</span>}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default RsvpList;
