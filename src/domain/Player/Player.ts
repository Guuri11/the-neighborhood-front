export type Gender = "male" | "female" | "other";
export type Position =
  | "POINT_GUARD"
  | "SHOOTING_GUARD"
  | "SMALL_FORWARD"
  | "POWER_FORWARD"
  | "CENTER";
export type Player = {
  id: number;
  name: string;
  email: string;
  nickname: string;
  height: number;
  weight: number;
  birthdate: string;
  level: number;
  experience: number;
  position: Position;
  gender: Gender;
  archetype: Archetype;
};

export type Archetype =
  | "SLASHING_PLAYMAKER"
  | "SHARP_SHOOTING_PLAYMAKER"
  | "DEFENSIVE_POINT_GUARD"
  | "THREE_AND_D_POINT_GUARD"
  | "POST_SCORING_POINT_GUARD"

  // Shooting Guard
  | "THREE_LEVEL_SCORER"
  | "SHOT_CREATING_WING"
  | "THREE_AND_D_WING"
  | "SLASHING_PLAYMAKER_GUARD"
  | "PURE_SHOOTER"

  // Small Forward
  | "ALL_AROUND_SUPERSTAR"
  | "THREE_AND_D_SMALL_FORWARD"
  | "SLASHING_PLAYMAKER_FORWARD"
  | "POST_SCORING_FORWARD"
  | "DEFENSIVE_SPECIALIST"

  // Power Forward
  | "STRETCH_FOUR"
  | "GLASS_CLEANER"
  | "DEFENSIVE_SPECIALIST_POWER_FORWARD"
  | "SLASHING_ATHLETIC_POWER_FORWARD"
  | "POST_SCORING_POWER_FORWARD"

  // Center
  | "TWO_WAY_FINISHING_BIG"
  | "RIM_PROTECTING_POST_SCORER"
  | "ATHLETIC_FINISHING_CENTER"
  | "STRETCH_FIVE"
  | "GLASS_CLEANER_CENTER";
