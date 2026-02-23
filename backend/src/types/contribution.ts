/* Contribution type definition used across the backend */
export interface ContributionType {
  _id?: string;
  name: string;
  message: string;
  amount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

/* Request body type for creating a new contribution */
export interface CreateContributionBody {
  name: string;
  message: string;
  amount?: number;
}
