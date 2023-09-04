import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/results-title/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert/error-alert";
import { getFilteredEvents } from "@/dummy-data";
import { getFilteredEventsFirebase } from "@/helper/api-util";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

const EventsSlug = (props) => {
  const router = useRouter();
  const [loadedEvents, setLoadedEvents] = useState();
  const filterData = router.query.slug;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "https://react-http-request-test-12f89-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      console.log("ue");
      console.log(data);
      const events = [];

      for (const key in data) {
        events.push({ id: key, ...data[key] });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  let headerContent = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All filtered events`} />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <Fragment>
        {headerContent}
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  headerContent = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}`}
      />
    </Head>
  );

  if (
    isNaN(numMonth) ||
    isNaN(numYear) ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {headerContent}
        <ErrorAlert>
          <p className="center">Invalid filter</p>
        </ErrorAlert>
      </Fragment>
    );
  }

  console.log("yes it is");
  console.log(loadedEvents);

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {headerContent}
        <ErrorAlert>
          <p>Sorry! no data found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      {headerContent}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (isNaN(numMonth) || isNaN(numYear) || numMonth < 1 || numMonth > 12) {
//     return { props: { hasError: true } /*notFound: true*/ };
//   }

//   const filteredEvents = await getFilteredEventsFirebase({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: { events: filteredEvents, date: { year: numYear, month: numMonth } },
//   };
// }

export default EventsSlug;
