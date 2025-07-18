export interface User {
  id: string;
  name: string;
  genre: string;
  email?: string;
}

export interface Contact {
  id: string;
  email: string;
  user_id: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  genre: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}
