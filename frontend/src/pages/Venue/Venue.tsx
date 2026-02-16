import React from "react";
import "./_venue.scss";

const S3_BASE = "https://crosby-wedding.s3.eu-west-2.amazonaws.com/venue";
const RUDGE_URL = "https://www.rudgefarmcottages.co.uk/";

/* Venue photo collage images */
const collageImages = [
  { src: `${S3_BASE}/rudge-courtyard.webp`, alt: "Rudge Farm courtyard and cottages" },
  { src: `${S3_BASE}/rudge-lake-aerial.webp`, alt: "Aerial view of the lake and grounds" },
  { src: `${S3_BASE}/rudge-ducks.webp`, alt: "Ducks at the duck house" },
  { src: `${S3_BASE}/rudge-bedroom.webp`, alt: "Cottage bedroom" },
  { src: `${S3_BASE}/rudge-pond-ducks.webp`, alt: "Ducks by the pond" },
  { src: `${S3_BASE}/rudge-kitchen.webp`, alt: "Cottage kitchen" },
];

/* Venue page — showcases Rudge Farm Cottages with parking info and photo collage */
const Venue: React.FC = () => (
  <main className="venue-page">
    {/* Logo and link to Rudge Farm Cottages */}
    <a
      href={RUDGE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="venue-page__logo-link"
    >
      <img
        src={`${S3_BASE}/rudge-logo.webp`}
        alt="Rudge Farm Cottages"
        className="venue-page__logo"
      />
    </a>
    <a
      href={RUDGE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="venue-page__url"
    >
      www.rudgefarmcottages.co.uk
    </a>

    {/* Venue address */}
    <address className="venue-page__address">
      Rudge Farm Cottages, Chilcombe,
      <br />
      Bridport, Dorset, DT6 4NF
    </address>

    {/* Parking information */}
    <section className="venue-page__parking">
      <h2 className="venue-page__heading">Parking</h2>
      <p className="venue-page__text">
        There are 20 spaces in the main car park and an overflow field at the
        top of the site for an additional 20 cars (weather dependent).
      </p>
      {/* Overflow car park restrictions */}
      <p className="venue-page__text">
        The overflow car park is for day use only — cars cannot be left
        overnight. Please bring a car that is suitable to be driven and parked
        in a field.
      </p>
      <ul className="venue-page__zone-list">
        <li className="venue-page__zone-item">
          <span className="venue-page__zone-dot venue-page__zone-dot--blue" />
          Drop off point
        </li>
        <li className="venue-page__zone-item">
          <span className="venue-page__zone-dot venue-page__zone-dot--red" />
          Overflow car park
        </li>
        <li className="venue-page__zone-item">
          <span className="venue-page__zone-dot venue-page__zone-dot--green" />
          Access driveway
        </li>
        <li className="venue-page__zone-item">
          <span className="venue-page__zone-dot venue-page__zone-dot--yellow" />
          Staying guests car park
        </li>
      </ul>
      <img
        src={`${S3_BASE}/rudge-parking-map.webp`}
        alt="Colour-coded parking zone map of Rudge Farm"
        className="venue-page__parking-map"
      />
    </section>

    {/* Venue photo collage */}
    <section className="venue-page__collage">
      {collageImages.map((img) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className="venue-page__collage-img"
          loading="lazy"
        />
      ))}
    </section>
  </main>
);

export default Venue;
