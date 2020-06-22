import { EVENTBRITE_BASE_URL, getEventbriteApiToken } from "./config";

/**
 * Retrieve an `EventbriteOrder` from the Eventbrite API.
 *
 * Requires Eventbrite API credentials to be available in the environment.
 *
 * @param orderId - The id of the order. Importantly, this is the "confirmation
 *   code" included in the email that Eventbrite sends when users register.
 */
export async function getEventbriteOrder({ orderId }: { orderId: string }) {
  const response = await fetch(
    EVENTBRITE_BASE_URL + "/orders/" + encodeURIComponent(orderId),
    {
      headers: {
        Authorization: `Bearer ${getEventbriteApiToken()}`,
      },
    }
  );

  // Eventbrite might return either a 400 or a 404 for an invalid order id
  // (even for things that "look" like valid identifiers).
  if (response.status === 400 || response.status === 404) {
    return null;
  }

  if (response.status !== 200) {
    throw new Error(
      `Unexpected status code return from Eventbrite: ${response.status} ${response.statusText}`
    );
  }

  const result: EventbriteOrder = await response.json();

  // Some defensive programming to make sure the API result we get is what we
  // expect
  if (!result || !result.id || result.id !== orderId) {
    const message = `Eventbrite returned 200, but got unexpected response`;
    console.error(message, result);
    throw new Error(message);
  }

  return result;
}

// https://www.eventbrite.com/platform/api#/reference/order
interface EventbriteOrder {
  id: string;
  // Date in ISO 8601 format
  created: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  event_id: string;
  // ... other stuff ...
}
