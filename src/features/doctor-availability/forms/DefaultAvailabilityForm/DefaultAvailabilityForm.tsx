import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";

import { FC, useState } from "react";
import { Calendar } from "react-big-calendar";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { Controller, useForm } from "react-hook-form";
import { NumberInput } from "../../../../shared/form-inputs";
import { DefaultAvailabilityFormData, defaultValues, schema } from "./config";
import { localizer } from "../../../../shared/utils/date-fns-localizer";
const DnDCalendar = withDragAndDrop(Calendar)

type ScheduleEvent = {
  id: number,
  numberOfWeek: number,
  start: Date,
  end: Date,
}

type Props = {
  handleFormSubmit: (values: DefaultAvailabilityFormData) => void
}


const DefaultAvailabilityForm: FC<Props> = ({ handleFormSubmit }) => {
  const [myEvents, setMyEvents] = useState<ScheduleEvent[]>([])

  const { handleSubmit, control } = useForm<DefaultAvailabilityFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });



  const newEvent = (slotInfo: any, onChange: any, value: any) => {
    const newEvent = {
      id: `${Date.now()}`,
      title: "Praca",
      start: slotInfo.start,
      end: slotInfo.end,
    };
    onChange([...value, newEvent]);
  };

  const moveEvent = ({ event, start, end }: any, onChange: any, value: any) => {
    const updatedEvents = value.map((ev: any) =>
      ev.id === event.id ? { ...ev, start, end } : ev
    );
    onChange(updatedEvents);
  };

  const resizeEvent = ({ event, start, end }: any, onChange: any, value: any) => {
    const updatedEvents = value.map((ev: any) =>
      ev.id === event.id ? { ...ev, start, end } : ev
    );
    onChange(updatedEvents);
  };

  const handleDeleteEvent = (event: any, onChange: any, value: any) => {
    if (window.confirm(`Napewno chcesz usunąć event: ${event.title}?`)) {
      onChange(value.filter((ev: any) => ev.id !== event.id));
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}
      style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 5, alignItems: 'center', backgroundColor: "white", padding: 5 }}>

      <NumberInput control={control} defaultValue={defaultValues.durationInMinutes} label="Długośc trwania wizyty" name="durationInMinutes" title="" />
      <Controller
        name="schedule"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <DnDCalendar
              localizer={localizer}
              culture="pl"
              view="week"
              events={value}
              selectable
              resizable
              style={{ height: '60vh', width: "100%", padding: 3 }}
              toolbar={false}
              formats={{
                dayFormat: (date, culture, localizer) =>
                  localizer?.format(date, "EEEE", culture) ?? "",
                timeGutterFormat: (date, culture, localizer) =>
                  localizer?.format(date, "HH:mm", culture) ?? "",
              }}
              onSelectSlot={(slotInfo) => newEvent(slotInfo, onChange, value)}
              onEventDrop={(event) => moveEvent(event, onChange, value)}
              onEventResize={(event) => resizeEvent(event, onChange, value)}
              onSelectEvent={(event) => handleDeleteEvent(event, onChange, value)}
            />
            {error && <p style={{ color: "red" }}>{error.message}</p>}
          </>
        )}
      />


      <Button
        type="submit"
        variant="contained"
        sx={{ width: '100%' }}
      >
        Potwierdż
      </Button>
    </form >
  );
};

export default DefaultAvailabilityForm;