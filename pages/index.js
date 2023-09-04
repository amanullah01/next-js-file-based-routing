import EventList from "@/components/events/event-list";
import { getFeaturedEventsFireBase } from "@/helper/api-util";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>Blog Home</title>
        <meta name="description" content="This is description" />
      </Head>
      <EventList items={props.events} />
    </div>
  );
};

export const getStaticProps = async () => {
  const get_featured_data = await getFeaturedEventsFireBase();
  return { props: { events: get_featured_data }, revalidate: 10 };
};

export default HomePage;
