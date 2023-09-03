import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/results-title/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert/error-alert";
import { getFilteredEvents } from "@/dummy-data";
import { getFilteredEventsFirebase } from "@/helper/api-util";
import { useRouter } from "next/router";
import { Fragment } from "react";

const EventsSlug = (props) => {
  const router = useRouter();
  // const filterData = router.query.slug;
  // console.log(filterData);

  // if (!filterData) {
  //   return (
  //     <ErrorAlert>
  //       <p className="center">Loading...</p>;
  //     </ErrorAlert>
  //   );
  // }

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  if (props.hasError) {
    return (
      <ErrorAlert>
        <p className="center">Invalid filter</p>
      </ErrorAlert>
    );
  }

  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Sorry! no data found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numMonth) || isNaN(numYear) || numMonth < 1 || numMonth > 12) {
    return { props: { hasError: true } /*notFound: true*/ };
  }

  const filteredEvents = await getFilteredEventsFirebase({
    year: numYear,
    month: numMonth,
  });

  return {
    props: { events: filteredEvents, date: { year: numYear, month: numMonth } },
  };
}

export default EventsSlug;
