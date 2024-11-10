import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";
import { getRandomColor } from "./util";

export const user_info = {
  name: uniqueNamesGenerator({ dictionaries: [adjectives, animals] }),
  color: getRandomColor(),
};
