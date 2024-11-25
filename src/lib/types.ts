export interface OpenDataRecord {
  monitor: string;
  datetime: string;
  laeq: number;
  lcfmax: number;
  lceq: number;
  la10: number;
  lc10: number;
  lafmax: number;
  la90: number;
  lc90: number;
}

export interface Monitor {
  serial_number: string;
  label: string;
  location: string;
  latitude: string;
  longitude: string;
  last_calibrated: string;
}
