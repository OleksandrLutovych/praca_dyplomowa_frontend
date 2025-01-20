import { DoctorSpeciality } from "../doctor-speciality/enum";

type Doctor = {
  id: number;
  user: {
    firstName: string;
    lastName: string;
  };
  proffesion: DoctorSpeciality;
  services: { id: number; service: string; price: number }[];
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
