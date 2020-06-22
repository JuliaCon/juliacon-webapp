import { nullthrows } from "./invariant";

export function getenvX(key: string): string {
  return nullthrows(process.env[key], `Failed to load ${key} from process.env`);
}
