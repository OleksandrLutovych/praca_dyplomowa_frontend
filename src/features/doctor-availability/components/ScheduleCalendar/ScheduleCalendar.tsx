import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, SlotInfo } from 'react-big-calendar';
import withDragAndDrop, { EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop';
import { localizer } from '../../../../shared/utils/date-fns-localizer';
import { useDisclosure } from '../../../../shared/hooks';
import { Card } from '@mui/material';
import { useDoctorDefaultSchedule } from '../../hooks';
import { CalendarEvent } from '../../../my-calendar/utils/types';
import { useCreateDoctorDefaultSchedule, useEditDoctorDefaultSchedule } from '../../hooks/mutations';
import { DefaultAvailabilityFormData } from '../../forms/DefaultAvailabilityForm/config';
import { ApiError, Loader } from '../../../../shared/ui';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import CreateEventModal from '../CreateEventModal';
const DnDCalendar = withDragAndDrop(Calendar)

const ScheduleCalendar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [selectedValue, setSelectedValue] = useState<{ start: Date, end: Date, id: number } | null>(null);
  const [calendarValues, setCalendarValues] = useState<CalendarEvent[]>([]);

  const [mode, setMode] = React.useState<'add' | 'edit'>('add');

  const { data, error, isError, isLoading } = useDoctorDefaultSchedule();
  const { mutate: createMutation, isPending: isCreateMutationLoading, isError: isCreateMutationError, error: createMutationError } = useCreateDoctorDefaultSchedule();
  const { mutate: editMutation, isPending: isEditMutationLoading, isError: isEditMutationError, error: editMutationError } = useEditDoctorDefaultSchedule(selectedValue?.id || 0);

  const calendarData: CalendarEvent[] = useMemo(() =>
    data?.map((event) => ({
      id: event.id,
      title: "Praca",
      start: new Date(event.start),
      end: new Date(event.end),
    })) || [], [data]);

  useEffect(() => {
    if (calendarData) {
      setCalendarValues(calendarData);
    }
  }, [calendarData]);

  const newEvent = (slotInfo: SlotInfo) => {
    setMode('add');
    const newEvent = {
      id: Date.now(),
      start: slotInfo.start,
      end: slotInfo.end,
    };
    setSelectedValue(newEvent);
    onOpen();
  };

  const handleMoveEvent = ({ event, start, end }: EventInteractionArgs<any>) => {
    setMode('edit');
    const updatedEvent = {
      ...event,
      start,
      end,
    }

    setSelectedValue(updatedEvent);
    onOpen();
  };

  const handleResizeEvent = ({ event, start, end }: EventInteractionArgs<any>) => {
    setMode('edit');
    const updatedEvent = {
      ...event,
      start,
      end,
    }
    setSelectedValue(updatedEvent);
    onOpen();
  };

  console.log(selectedValue)

  const handleFormSubmit = (values: DefaultAvailabilityFormData) => {

    if (mode === 'add') {
      createMutation(values);
    } else if (mode === 'edit') {
      editMutation(values);
    }
    setSelectedValue(null);
  };

  // const handleDeleteEvent = (event: any, onChange: any, value: any) => {
  //   if (window.confirm(`Napewno chcesz usunąć event: ${event.title}?`)) {
  //     onChange(value.filter((ev: any) => ev.id !== event.id));
  //   }
  // };

  return (
    <>
      <Loader isLoading={isLoading || isCreateMutationLoading || isEditMutationLoading} />
      <ApiError error={error || createMutationError || editMutationError} isError={isError || isCreateMutationError || isEditMutationError} />

      <Card>
        <DnDCalendar
          localizer={localizer}
          culture="pl"
          view="week"
          events={calendarValues}
          selectable
          resizable
          style={{ height: '80vh', width: "100%", padding: 3 }}
          toolbar={false}
          formats={{
            dayFormat: (date, culture, localizer) =>
              localizer?.format(date, "EEEE", culture) ?? "",
            timeGutterFormat: (date, culture, localizer) =>
              localizer?.format(date, "HH:mm", culture) ?? "",
          }}
          onSelectSlot={(slotInfo) => newEvent(slotInfo)}
          onEventDrop={(event) => handleMoveEvent(event)}
          onEventResize={(event) => handleResizeEvent(event)}
        // onSelectEvent={(event) => handleDeleteEvent(event, onChange)}
        />

        {selectedValue && <CreateEventModal isOpen={isOpen} onClose={onClose} value={selectedValue} handleFormSubmit={handleFormSubmit} />}
      </Card>
    </>
  );
};

export default ScheduleCalendar;