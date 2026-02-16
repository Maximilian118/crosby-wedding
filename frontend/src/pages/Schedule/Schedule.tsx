import React from "react";
import "./_schedule.scss";

const SCHEDULE_IMG = "https://crosby-wedding.s3.eu-west-2.amazonaws.com/schedule/timeline.webp";

/* Schedule page — displays the Timeline of Events image */
const Schedule: React.FC = () => (
  <main className="schedule-page">
    <img
      src={SCHEDULE_IMG}
      alt="Timeline of Events"
      className="schedule-page__image"
    />
  </main>
);

export default Schedule;
