export interface FAQ {
  question: string;
  answer: string;
}

export interface Item {
  name: string;
  price: number;
  description?: string;
}

export interface BusinessData {
  email: string;
  password: string;
  business_id: string;
  businessName: string;
  businessDescription: string;
  businessCategory: string;
  extra_information: string;
  businessAddress: string;
  businessPhone: string;
  businessEmailAddress: string;
  businessWebsite: string;
  businessOpenHours: string;
  businessOpenDays: string;
  businessPicture: string;
  faqs: FAQ[];
  items: Item[];
}

// ---- Business hours (structured, serialized into the two API string fields) ----

export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export type Day = (typeof DAYS)[number];

export interface DayHours {
  open: boolean;
  from: string;
  to: string;
}

export type HoursState = Record<Day, DayHours>;

export const TIME_OPTIONS: string[] = (() => {
  const out: string[] = [];
  for (let h = 0; h < 24; h++) {
    const period = h < 12 ? "AM" : "PM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    out.push(`${hour12}:00 ${period}`);
  }
  return out;
})();

export function defaultHours(): HoursState {
  return DAYS.reduce((acc, day) => {
    acc[day] = { open: day !== "Sunday", from: "9:00 AM", to: "5:00 PM" };
    return acc;
  }, {} as HoursState);
}

export function serializeOpenDays(hours: HoursState): string {
  return DAYS.filter((d) => hours[d].open).join(", ");
}

export function serializeOpenHours(hours: HoursState): string {
  return DAYS.filter((d) => hours[d].open)
    .map((d) => `${d}: ${hours[d].from} - ${hours[d].to}`)
    .join(", ");
}

/** Rebuilds the structured hours editor state from the serialized API strings. */
export function parseHours(openDays?: string, openHours?: string): HoursState {
  const state = defaultHours();

  if (openHours && openHours.trim()) {
    DAYS.forEach((d) => {
      state[d] = { ...state[d], open: false };
    });
    openHours.split(",").forEach((segment) => {
      const colon = segment.indexOf(":");
      if (colon === -1) return;
      const day = segment.slice(0, colon).trim() as Day;
      if (!DAYS.includes(day)) return;
      const [from, to] = segment
        .slice(colon + 1)
        .split(" - ")
        .map((s) => s.trim());
      if (from && to) state[day] = { open: true, from, to };
    });
    return state;
  }

  if (openDays && openDays.trim()) {
    DAYS.forEach((d) => {
      state[d] = { ...state[d], open: openDays.includes(d) };
    });
  }
  return state;
}
