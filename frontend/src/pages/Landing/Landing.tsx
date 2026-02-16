import React from "react";
import "./_landing.scss";

const S3_BASE = "https://crosby-wedding.s3.eu-west-2.amazonaws.com/landing";

/* Landing page photo collage — ordered for visual variety: alternating portrait/landscape, couple/solo */
const collageImages = [
  { src: `${S3_BASE}/landing-03.webp`, alt: "Couple in a meadow" },
  { src: `${S3_BASE}/landing-01.webp`, alt: "Kate in the mountains" },
  { src: `${S3_BASE}/landing-09.webp`, alt: "Couple with puppy" },
  { src: `${S3_BASE}/landing-05.webp`, alt: "Couple at Red Bull Racing" },
  { src: `${S3_BASE}/landing-13.webp`, alt: "Kate at graduation" },
  { src: `${S3_BASE}/landing-28.webp`, alt: "Couple at a bonfire" },
  { src: `${S3_BASE}/landing-18.webp`, alt: "Max with dog at quarry" },
  { src: `${S3_BASE}/landing-20.webp`, alt: "Couple outside Wicked" },
  { src: `${S3_BASE}/landing-22.webp`, alt: "Kate at art exhibition" },
  { src: `${S3_BASE}/landing-06.webp`, alt: "Couple with snowman" },
  { src: `${S3_BASE}/landing-14.webp`, alt: "Max with F1 trophy" },
  { src: `${S3_BASE}/landing-07.webp`, alt: "Couple at dinner" },
  { src: `${S3_BASE}/landing-21.webp`, alt: "Kate mountain biking" },
  { src: `${S3_BASE}/landing-04.webp`, alt: "Couple with moving van" },
  { src: `${S3_BASE}/landing-15.webp`, alt: "Couple selfie in mountains" },
  { src: `${S3_BASE}/landing-23.webp`, alt: "Kate at flower wall" },
  { src: `${S3_BASE}/landing-10.webp`, alt: "Kate jumping at the lake" },
  { src: `${S3_BASE}/landing-17.webp`, alt: "Max camping in the Alps" },
  { src: `${S3_BASE}/landing-08.webp`, alt: "Couple on the beach" },
  { src: `${S3_BASE}/landing-02.webp`, alt: "Couple selfie on a hike" },
  { src: `${S3_BASE}/landing-12.webp`, alt: "Kate with a cocktail" },
  { src: `${S3_BASE}/landing-25.webp`, alt: "Couple at new house" },
  { src: `${S3_BASE}/landing-19.webp`, alt: "Couple selfie at castle" },
  { src: `${S3_BASE}/landing-11.webp`, alt: "Couple walking in snow with dog" },
  { src: `${S3_BASE}/landing-16.webp`, alt: "Couple at Disney" },
  { src: `${S3_BASE}/landing-26.webp`, alt: "Max with cat in van" },
  { src: `${S3_BASE}/landing-27.webp`, alt: "Couple selfie in sunshine" },
  { src: `${S3_BASE}/landing-24.webp`, alt: "Kate with ice cream" },
  { src: `${S3_BASE}/landing-29.webp`, alt: "Couple in hard hats" },
  { src: `${S3_BASE}/landing-30.webp`, alt: "Couple at cottage" },
];

/* Landing page — masonry photo collage with couple's names heading */
const Landing: React.FC = () => (
  <main className="landing-page">
    {/* Couple's names */}
    <h1 className="landing-page__heading">Maximilian & Kate</h1>

    {/* Photo masonry collage */}
    <section className="landing-page__collage">
      {collageImages.map((img) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className="landing-page__img"
          loading="lazy"
        />
      ))}
    </section>
  </main>
);

export default Landing;
