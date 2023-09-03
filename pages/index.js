import EventList from "@/components/events/event-list";
import { getFeaturedEventsFireBase } from "@/helper/api-util";

const HomePage = (props) => {
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
};

export const getStaticProps = async () => {
  const get_featured_data = await getFeaturedEventsFireBase();
  return { props: { events: get_featured_data }, revalidate: 10 };
};

export default HomePage;
