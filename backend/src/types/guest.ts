/* Guest type definition used across the backend */
export interface GuestType {
  _id?: string;
  fullName: string;
  vegetarian: boolean;
  car: boolean;
  noAlcohol: boolean;
  comments: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/* Request body type for creating a new RSVP */
export interface CreateRsvpBody {
  fullName: string;
  vegetarian?: boolean;
  car?: boolean;
  noAlcohol?: boolean;
  comments?: string;
}
