type Doctor = {
  id: string;
  user: {
    firstName: string;
    lastName: string;
  }
  proffesion: string;
  services: string[];
  rating: number;
  image: string;
};

export type { Doctor };
