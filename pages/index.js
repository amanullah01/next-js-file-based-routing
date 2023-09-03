import { getFeaturedEvents } from "@/dummy-data";
import EventList from "@/components/events/event-list";

const HomePage = () => {
  const featuredData = getFeaturedEvents();
  return (
    <div>
      <EventList items={featuredData} />
    </div>
  );
};
export default HomePage;
