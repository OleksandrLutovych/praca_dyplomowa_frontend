export interface DoctorProfileData {
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
    recomendations?: string;
  }[];
}

export interface PatientProfileData {
  personalData: {
    name: string;
    lastName: string;
  };
  contactData: {
    email: string;
    phone: string;
  };
  age: string;
  pesel: string;
  address: string;
}
