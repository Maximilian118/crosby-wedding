import React from "react";
import "./_food.scss";

const S3_BASE = "https://crosby-wedding.s3.eu-west-2.amazonaws.com/food";
const STK_URL = "https://www.smoketinkitchen.com/";

/* Masonry collage images — order curated for visual variety */
const collageImages = [
  { src: `${S3_BASE}/stk-papermill-1.webp`, alt: "Smoke Tin Kitchen table spread" },
  { src: `${S3_BASE}/stk-food-5.webp`, alt: "Smoked ribs on cutting board" },
  { src: `${S3_BASE}/stk-event-1.webp`, alt: "Smoke Tin Kitchen fire" },
  { src: `${S3_BASE}/stk-food-3.webp`, alt: "Watermelon and feta salad" },
  { src: `${S3_BASE}/stk-web-1.webp`, alt: "Wood fire cooking" },
  { src: `${S3_BASE}/stk-food-1.webp`, alt: "Glazed ribs" },
  { src: `${S3_BASE}/stk-event-2.webp`, alt: "Charred corn with parmesan" },
  { src: `${S3_BASE}/stk-food-2.webp`, alt: "Smoke Tin Kitchen trailer" },
  { src: `${S3_BASE}/stk-food-4.webp`, alt: "Sausage rolls" },
  { src: `${S3_BASE}/stk-papermill-2.webp`, alt: "Hummus and fig spread" },
  { src: `${S3_BASE}/stk-food-6.webp`, alt: "Bread and charcuterie" },
  { src: `${S3_BASE}/stk-food-7.webp`, alt: "Glazed sausages" },
];

/* Grazing table menu items */
const grazingItems = [
  "STK White Bean Hummus, Baba Ghanoush, Toasted Nuts, Seeds and Pickles, Crispy Sourdough",
  "Iced Crudities",
  "Mozzarella, Heritage Tomato, Fig, Pumpkin Seed Pesto",
  "Local Cheeses, Celery, Apple, Grapes, Crackers",
  "Selection of Cured and Smoked Meats",
  "Selection of Sourdough and Artisan Breads",
  "Homemade Sausage Rolls",
];

/* BBQ feast main dishes */
const bbqMains = [
  "Smoked Beef Picanha, Chimichurri",
  "Grilled Pork Belly Ribs, Cider BBQ Mop",
  "Smoked Chicken, Paprika, Honey, Lemon",
  "Smoked Chorizo, Sherry Glaze",
  "Mustard BBQ Sauce, Watercress and Pickles",
];

/* BBQ feast side dishes */
const bbqSides = [
  "Potato Salad, Cucumber, Yogurt, Chive",
  "Raw Slaw, Fennel, Pistachio, Tarragon",
  "Charred Corn on Cob, Chipotle Butter",
  "Heritage Tomato Salad, Watermelon, Basil, Feta",
];

/* Food page — showcases Smoke Tin Kitchen catering with menu and photo collage */
const Food: React.FC = () => (
  <main className="food-page">
    {/* Logo and link to Smoke Tin Kitchen */}
    <a
      href={STK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="food-page__logo-link"
    >
      <img
        src={`${S3_BASE}/stk-logo.webp`}
        alt="Smoke Tin Kitchen"
        className="food-page__logo"
      />
    </a>
    <a
      href={STK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="food-page__url"
    >
      www.smoketinkitchen.com
    </a>

    {/* Introduction */}
    <p className="food-page__intro">
      A grazing table will be served directly after the ceremony, followed by a
      full BBQ feast in the evening.
    </p>

    {/* Grazing table menu */}
    <section className="food-page__menu-section">
      <h2 className="food-page__menu-heading">Grazing Table</h2>
      <ul className="food-page__menu-list">
        {grazingItems.map((item) => (
          <li key={item} className="food-page__menu-item">
            {item}
          </li>
        ))}
      </ul>
    </section>

    {/* BBQ feast menu */}
    <section className="food-page__menu-section">
      <h2 className="food-page__menu-heading">BBQ Feast</h2>
      <ul className="food-page__menu-list">
        {bbqMains.map((item) => (
          <li key={item} className="food-page__menu-item">
            {item}
          </li>
        ))}
      </ul>
      <div className="food-page__menu-divider" />
      <ul className="food-page__menu-list">
        {bbqSides.map((item) => (
          <li key={item} className="food-page__menu-item">
            {item}
          </li>
        ))}
      </ul>
    </section>

    {/* Masonry photo collage */}
    <section className="food-page__collage">
      {collageImages.map((img) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className="food-page__collage-img"
          loading="lazy"
        />
      ))}
    </section>
  </main>
);

export default Food;
