import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Monitor } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const monitors: Monitor[] = [
  {
    serial_number: "10.1.1.1",
    label: "Noise 1",
    location: "Drumcondra Library",
    latitude: "53.369864",
    longitude: "-6.258966",
    last_calibrated: "2018-08-29",
  },
  {
    serial_number: "01749",
    label: "Noise 2",
    location: "Bull Island",
    latitude: "53.36866",
    longitude: "-6.149316",
    last_calibrated: "2023-03-13",
  },
  {
    serial_number: "01508",
    label: "Noise 3",
    location: "Ballyfermot Civic Centre",
    latitude: "53.343337",
    longitude: "-6.362923",
    last_calibrated: "2022-02-08",
  },
  {
    serial_number: "10118",
    label: "Noise 4",
    location: "Ballymun",
    latitude: "53.390401",
    longitude: "-6.264755",
    last_calibrated: "2023-03-01",
  },
  {
    serial_number: "01548",
    label: "Noise 5",
    location: "DCC Rowing Club",
    latitude: "53.346116",
    longitude: "-6.321013",
    last_calibrated: "2023-02-21",
  },
  {
    serial_number: "10115",
    label: "Noise 6",
    location: "Walkinstown",
    latitude: "53.319492",
    longitude: "-6.321945",
    last_calibrated: "2023-02-28",
  },
  {
    serial_number: "10.1.1.7",
    label: "Noise 7",
    location: "Woodstock Gardens",
    latitude: "53.323524",
    longitude: "-6.247734",
    last_calibrated: "2021-01-20",
  },
  {
    serial_number: "01870",
    label: "Noise 8",
    location: "Navan Road",
    latitude: "53.370758",
    longitude: "-6.325578",
    last_calibrated: "2023-08-22",
  },
  {
    serial_number: "01575",
    label: "Noise 9",
    location: "Raheny",
    latitude: "53.379996",
    longitude: "-6.172829",
    last_calibrated: "2023-02-21",
  },
  {
    serial_number: "01737",
    label: "Noise 10",
    location: "Ringsend Sports Centre",
    latitude: "53.340031",
    longitude: "-6.2200231",
    last_calibrated: "2023-03-07",
  },
  {
    serial_number: "10.1.1.11",
    label: "Noise 11",
    location: "Chancery Park ",
    latitude: "53.346694",
    longitude: "-6.272244",
    last_calibrated: "2021-01-28",
  },
  {
    serial_number: "10.1.1.12",
    label: "Noise 12",
    location: "Blessington Basin",
    latitude: "53.357153",
    longitude: "-6.270895",
    last_calibrated: "2021-02-01",
  },
  {
    serial_number: "01550",
    label: "Noise 13",
    location: "Dolphins Barn",
    latitude: "53.331059",
    longitude: "-6.292452",
    last_calibrated: "2023-02-21",
  },
  {
    serial_number: "01534",
    label: "Noise 14",
    location: "Woodstock Gardens Temp replacement",
    latitude: "53.323204",
    longitude: "-6.247469",
    last_calibrated: "2022-03-24",
  },
  {
    serial_number: "01535",
    label: "Noise 16",
    location: "Blessington Basin Temp replacement",
    latitude: "53.357153",
    longitude: "-6.270895",
    last_calibrated: "2022-03-24",
  },
  {
    serial_number: "01509",
    label: "Noise 17",
    location: "Strand Road",
    latitude: "53.3279804",
    longitude: "-6.2088104",
    last_calibrated: "2023-02-21",
  },
  {
    serial_number: "01529",
    label: "Noise 18",
    location: "Chancery Park Temp Replacement",
    latitude: "53.346665",
    longitude: "-6.272211",
    last_calibrated: "2022-03-21",
  },
  {
    serial_number: "01530",
    label: "Noise 19 Spare",
    location: "In Office",
    latitude: "",
    longitude: "",
    last_calibrated: "2022-03-22",
  },
  {
    serial_number: "01528",
    label: "Noise 20",
    location: "Drumcondra Temp Replacement",
    latitude: "53.369847",
    longitude: "-6.258945",
    last_calibrated: "2022-03-21",
  },
];

export function stringToColorHash(str: string) {
  // String hash
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // 32 bits
  }

  // Hash to RGB
  const r = (hash >> 16) & 0xff;
  const g = (hash >> 8) & 0xff;
  const b = hash & 0xff;

  // Calculate luminance based on WCAG (Web Content Accessibility Guidelines)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const textColor = luminance > 0.7 ? "text-black" : "text-white";

  const bgColor = `bg-[#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)}]`;

  return {
    bgColor: bgColor,
    textColor: textColor,
  };
}
