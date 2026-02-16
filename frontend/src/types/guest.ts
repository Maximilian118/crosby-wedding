/* Guest data shape matching the backend model */
export interface GuestType {
  _id?: string;
  fullName: string;
  vegetarian: boolean;
  car: boolean;
  noAlcohol: boolean;
  comments: string;
  createdAt?: string;
  updatedAt?: string;
}

/* Shape of the request body when submitting an RSVP */
export interface CreateRsvpBody {
  fullName: string;
  vegetarian?: boolean;
  car?: boolean;
  noAlcohol?: boolean;
  comments?: string;
}
