import {
  format,
  FormatOptions,
  getDay,
  parse,
  ParseOptions,
  startOfWeek,
  StartOfWeekOptions,
} from "date-fns";
import { enUS, pl } from "date-fns/locale";
import { dateFnsLocalizer } from "react-big-calendar";

const locales = {
  en: enUS,
  pl: pl,
};

const localizer = dateFnsLocalizer({
  format: (
    date: string | number | Date,
    formatString: string,
    options: FormatOptions | undefined
  ) => format(date, formatString, options),
  parse: (
    value: string,
    formatString: string,
    options: ParseOptions<Date> | undefined
  ) => parse(value, formatString, new Date(), options),
  startOfWeek: (date: any, options: StartOfWeekOptions<any> | undefined) =>
    startOfWeek(date, options),
  getDay: (date: string | number | Date) => getDay(date),
  locales,
});

export { localizer };
