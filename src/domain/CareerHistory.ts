import { Position } from "./Player"

// TODO: review this
export type CareerHistory = {
    position: Position;
    team: string;
    league: string;
    pointsPerGame: number;
    assistsPerGame: number;
    reboundsPerGame: number;
    blocksPerGame: number;
    stealsPerGame: number;
}