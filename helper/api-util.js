export const getAllEvents = async () => {
  const response = await fetch(
    "https://react-http-request-test-12f89-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );

  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({ id: key, ...data[key] });
  }

  return events;
};

export const getFeaturedEventsFireBase = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};
