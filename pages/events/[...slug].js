import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/results-title/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert/error-alert";
import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import { Fragment } from "react";

const EventsSlug = () => {
  const router = useRouter();
  const filterData = router.query.slug;
  console.log(filterData);

  if (!filterData) {
    return (
      <ErrorAlert>
        <p className="center">Loading...</p>;
      </ErrorAlert>
    );
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numMonth) || isNaN(numYear) || numMonth < 1 || numMonth > 12) {
    return (
      <ErrorAlert>
        <p className="center">Invalid filter</p>
      </ErrorAlert>
    );
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

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

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};
export default EventsSlug;
