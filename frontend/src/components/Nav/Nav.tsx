import React from "react"
import { useLocation } from "react-router-dom"
import "./_nav.scss"
import { navItems } from "./NavUtility"
import NavItem from "./NavItem/NavItem"

/* Find the central logo item (the one with an img but no text) */
const logoItem = navItems.find((item) => item.img && !item.text)

const Nav: React.FC = () => {
  const { pathname } = useLocation();

  /* On the menu page, M&K links back to home; everywhere else it opens the menu */
  const mobileLogoUrl = pathname === "/menu" ? "/" : "/menu";

  return (
    <nav>
      {/* Desktop: all nav items in a row (hidden on mobile via CSS) */}
      <div className="nav__desktop">
        {navItems.map((item, i) => (
          <NavItem key={i} item={item} />
        ))}
      </div>

      {/* Mobile: just the logo (hidden on desktop via CSS) */}
      <div className="nav__mobile">
        {logoItem && (
          <NavItem item={{ ...logoItem, url: mobileLogoUrl }} />
        )}
      </div>
    </nav>
  )
}

export default Nav
