import { DoctorSpeciality } from "../doctor-speciality/enum";

type Doctor = {
  id: number;
  user: {
    firstName: string;
    lastName: string;
  };
  proffesion: DoctorSpeciality;
  ranking: number;
  isAvailable: boolean;
  closestAvailableDate: Date;
  comments?: { author: string; message: string; date: Date }[];
  services: { id: number; service: string; price: number }[];
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
