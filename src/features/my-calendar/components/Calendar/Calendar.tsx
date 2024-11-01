import {Calendar as ReactBigCalendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

const Calendar = () => {
    return (
        <ReactBigCalendar
            localizer={localizer}
            events={[]}
            startAccessor="start"
            endAccessor="end"
            style={{height: 500}}
        />

    );
};

export default Calendar;