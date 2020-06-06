/**
 * A Speaker that is associated with a Talk.
 */
import { LocalizedText } from "./PretalxAPICommon";

export interface PretalxAPIRoom {
  // NOTE: This is actually returned by pretalx as an integer, but for
  // consistency, we convert it to string when we fetch it
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  capacity?: number;

  /**
   * A number indicating the ordering of the room relative to other rooms, e.g.
   * in schedule visualisations.
   *
   * In my experience, this tends to just always be null (at least for JuliaCon
   * 2019).
   */
  position?: null | number;
}
