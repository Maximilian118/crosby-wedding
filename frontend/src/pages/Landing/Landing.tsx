import React from "react";
import { Link } from "react-router-dom";
import "./_landing.scss";

const S3_BASE = "https://crosby-wedding.s3.eu-west-2.amazonaws.com/landing";

/* Landing page photo collage — ordered for visual variety with aspect ratios to prevent layout shift */
const collageImages = [
  { src: `${S3_BASE}/landing-03.webp`, alt: "Couple in a meadow", ratio: "3 / 4" },
  { src: `${S3_BASE}/landing-01.webp`, alt: "Kate in the mountains", ratio: "2048 / 1529" },
  { src: `${S3_BASE}/landing-09.webp`, alt: "Couple with puppy", ratio: "938 / 1024" },
  { src: `${S3_BASE}/landing-05.webp`, alt: "Couple at Red Bull Racing", ratio: "4 / 3" },
  { src: `${S3_BASE}/landing-13.webp`, alt: "Kate at graduation", ratio: "3 / 4" },
  { src: `${S3_BASE}/landing-28.webp`, alt: "Couple at a bonfire", ratio: "3 / 4" },
  { src: `${S3_BASE}/landing-18.webp`, alt: "Max with dog at quarry", ratio: "4928 / 3264" },
  { src: `${S3_BASE}/landing-20.webp`, alt: "Couple outside Wicked", ratio: "3 / 4" },
  { src: `${S3_BASE}/landing-22.webp`, alt: "Kate at art exhibition", ratio: "4 / 3" },
  { src: `${S3_BASE}/landing-06.webp`, alt: "Couple with snowman", ratio: "3 / 4" },
  { src: `${S3_BASE}/landing-14.webp`, alt: "Max with F1 trophy", ratio: "3 / 4" },
  { src: `${S3_BASE}/landing-07.webp`, alt: "Couple at dinner", ratio: "4 / 3" },
  { src: `${S3_BASE}/landing-21.webp`, alt: "Kate mountain biking", ratio: "3 / 4" },
  { src: `${S3_BASE}/landing-04.webp`, alt: "Couple with moving van", ratio: "4 / 3" },
  { src: `${S3_BASE}/landing-15.webp`, alt: "Couple selfie in mountains", ratio: "3 / 4" },
  { src: `${S3_BASE}/landing-23.webp`, alt: "Kate at flower wall", ratio: "3 / 4" },
  { src: `${S3_BASE}/landing-10.webp`, alt: "Kate jumping at the lake", ratio: "4 / 3" },
  { src: `${S3_BASE}/landing-17.webp`, alt: "Max camping in the Alps", ratio: "3 / 4" },
  { src: `${S3_BASE}/landing-08.webp`, alt: "Couple on the beach", ratio: "1202 / 1600" },
  { src: `${S3_BASE}/landing-02.webp`, alt: "Couple selfie on a hike", ratio: "4 / 3" },
  { src: `${S3_BASE}/landing-12.webp`, alt: "Kate with a cocktail", ratio: "3 / 4" },
  { src: `${S3_BASE}/landing-25.webp`, alt: "Couple at new house", ratio: "3 / 4" },
  { src: `${S3_BASE}/landing-19.webp`, alt: "Couple selfie at castle", ratio: "4 / 3" },
  { src: `${S3_BASE}/landing-11.webp`, alt: "Couple walking in snow with dog", ratio: "3 / 4" },
  { src: `${S3_BASE}/landing-16.webp`, alt: "Couple at Disney", ratio: "3 / 4" },
  { src: `${S3_BASE}/landing-26.webp`, alt: "Max with cat in van", ratio: "3 / 4" },
  { src: `${S3_BASE}/landing-27.webp`, alt: "Couple selfie in sunshine", ratio: "3 / 4" },
  { src: `${S3_BASE}/landing-24.webp`, alt: "Kate with ice cream", ratio: "3 / 4" },
  { src: `${S3_BASE}/landing-29.webp`, alt: "Couple in hard hats", ratio: "3 / 4" },
  { src: `${S3_BASE}/landing-30.webp`, alt: "Couple at cottage", ratio: "3 / 4" },
];

/* Landing page — masonry photo collage with couple's names heading */
const Landing: React.FC = () => (
  <main className="landing-page">
    {/* Couple's names */}
    <h1 className="landing-page__heading">Maximilian & Kate</h1>

    {/* Honeymoon fund link */}
    <Link to="/honeymoon-fund" className="landing-page__fund-link">
      Honeymoon Fund
    </Link>

    {/* Photo masonry collage */}
    <section className="landing-page__collage">
      {collageImages.map((img) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className="landing-page__img"
          style={{ aspectRatio: img.ratio }}
          loading="lazy"
        />
      ))}
    </section>
  </main>
);

export default Landing;
