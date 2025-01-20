import { DoctorSpeciality } from "./enum";

export const doctorSpecialityOptions = Object.entries(DoctorSpeciality).map(
  ([key, value]) => ({
    key,
    label: value,
  })
);

export const doctorSpecialityLabel = (speciality: DoctorSpeciality) => {
  return doctorSpecialityOptions.find((option) => option.key === speciality)
    ?.label;
};
