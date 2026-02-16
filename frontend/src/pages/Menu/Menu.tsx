import React from "react";
import "./_menu.scss";
import { navItems } from "../../components/Nav/NavUtility";
import { useNavigate } from "react-router-dom";

/* Filter to text-based nav items (excludes the logo) */
const menuLinks = navItems.filter((item) => item.text);

/* Mobile menu page — displays nav links as a centered vertical list */
const Menu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="menu-page">
      <ul className="menu-page__list">
        {menuLinks.map((item, i) => (
          <li
            key={i}
            className="menu-page__item"
            onClick={() => navigate(item.url)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Menu;
