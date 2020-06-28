import { getenvX } from "../../utils/getenv";

export const EVENTBRITE_BASE_URL = "https://www.eventbriteapi.com/v3";
export const EVENTBRITE_EVENT_ID = "79192116753";

export const getEventbriteApiToken = () => getenvX("EVENTBRITE_API_TOKEN");
