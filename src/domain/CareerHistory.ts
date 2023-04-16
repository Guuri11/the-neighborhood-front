import { Player, Position } from "./Player";

// TODO: review this
export type CareerHistory = {
  player: { id: number };
  position: Position;
  team: string;
  league: string;
  pointsPerGame: number;
  assistsPerGame: number;
  reboundsPerGame: number;
  blocksPerGame: number;
  stealsPerGame: number;
};
