import EventItem from "./event-item";

const EventList = (props) => {
  const { items } = props;
  return (
    <ul>
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
