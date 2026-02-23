/* Contribution data shape matching the backend model */
export interface ContributionType {
  _id?: string;
  name: string;
  message: string;
  amount?: number;
  createdAt?: string;
  updatedAt?: string;
}

/* Shape of the request body when submitting a contribution */
export interface CreateContributionBody {
  name: string;
  message: string;
  amount?: number;
}
