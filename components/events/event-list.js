import EventItem from "./event-item";

import classes from "./eventList.module.css";

const EventList = (props) => {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
          id={event.id}
          key={event.id}
        />
      ))}
    </ul>
  );
};
export default EventList;
