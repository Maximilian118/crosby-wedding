import React from "react";
import "./_contributionlist.scss";
import type { ContributionType } from "../../types/contribution";
import { getRelativeTime } from "../../services/relativeTime";
import Spinner from "../Spinner/Spinner";

interface ContributionListProps {
  contributions: ContributionType[];
  loading?: boolean;
}

/* Renders a list of honeymoon fund contributions with name, relative date, optional amount, and message */
const ContributionList: React.FC<ContributionListProps> = ({
  contributions,
  loading = false,
}) => {
  if (loading) {
    return <Spinner />;
  }

  if (contributions.length === 0) {
    return (
      <p className="contribution-list__empty">
        No messages yet — be the first!
      </p>
    );
  }

  return (
    <ul className="contribution-list">
      {contributions.map((contribution) => (
        <li key={contribution._id} className="contribution-list__item">
          {/* Header row: name and relative date */}
          <div className="contribution-list__header">
            <span className="contribution-list__name">
              {contribution.name}
            </span>
            {contribution.createdAt && (
              <span className="contribution-list__date">
                {getRelativeTime(contribution.createdAt)}
              </span>
            )}
          </div>

          {/* Optional amount */}
          {contribution.amount && contribution.amount > 0 && (
            <span className="contribution-list__amount">
              £{contribution.amount}
            </span>
          )}

          {/* Message */}
          <p className="contribution-list__message">{contribution.message}</p>
        </li>
      ))}
    </ul>
  );
};

export default ContributionList;
