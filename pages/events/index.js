import EventList from "@/components/events/event-list";
import EventSearch from "@/components/events/event-search";
import { getAllEvents } from "@/helper/api-util";
import { useRouter } from "next/router";

const AllEventsPage = (props) => {
  const events = props.events;
  const router = useRouter();

  const searchHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <div>
      <EventSearch onSubmitSearch={searchHandler} />
      <EventList items={events} />
    </div>
  );
};
export default AllEventsPage;

export const getStaticProps = async () => {
  const events = await getAllEvents();
  return { props: { events: events }, revalidate: 60 };
};
