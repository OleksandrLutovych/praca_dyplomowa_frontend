type Doctor = {
  id: number;
  user: {
    firstName: string;
    lastName: string;
  };
  proffesion: string;
  services: string[];
  rating: number;
  image: string;
};

type DoctorProfileData = {
  personalData: {
    name: string;
    lastName: string;
  };
  contactData: {
    email: string;
    phone: string;
  };
  professionalData: {
    proffesion: string;
    education: string;
    about: string;
  };
  services: {
    service: string;
    price: number;
    recomendation?: string;
  }[];
};

export type { Doctor, DoctorProfileData };
