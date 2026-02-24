import React from "react";
import "./_menu.scss";
import { useNavigate } from "react-router-dom";
import {
  Home,
  MapPin,
  UtensilsCrossed,
  Clock,
  PartyPopper,
  Plane,
} from "lucide-react";

/* Menu items with associated Lucide icons */
const menuItems = [
  { text: "Home", url: "/", icon: Home },
  { text: "Venue", url: "/venue", icon: MapPin },
  { text: "Food", url: "/food", icon: UtensilsCrossed },
  { text: "Schedule", url: "/schedule", icon: Clock },
  { text: "RSVP", url: "/rsvp", icon: PartyPopper },
  { text: "Honeymoon Fund", url: "/honeymoon-fund", icon: Plane },
];

/* Mobile menu page — displays nav links as a centered vertical list */
const Menu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="menu-page">
      <ul className="menu-page__list">
        {menuItems.map((item) => (
          <li
            key={item.url}
            className="menu-page__item"
            onClick={() => navigate(item.url)}
          >
            <item.icon size={20} strokeWidth={1.5} />
            {item.text}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Menu;
