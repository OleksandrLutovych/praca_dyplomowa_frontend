import { VisitSubType, VisitType } from "../../../entities/visits/enums";

const visitTypes = [
  {
    key: VisitType.ONLINE,
    label: "Online",
  },
  {
    key: VisitType.STATIONARY,
    label: "Stacjonarna",
  },
];

const visitSubTypes = [
  {
    key: VisitSubType.FIRST,
    label: "Pierwsza wizyta",
  },
  {
    key: VisitSubType.CONTROL,
    label: "Kontrolna",
  },
];

export { visitTypes, visitSubTypes };
