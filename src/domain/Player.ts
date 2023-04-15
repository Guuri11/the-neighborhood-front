export type Gender = "male" | "female" | "other";
export type  Position = "POINT_GUARD" | "SHOOTING_GUARD" | "SMALL_FORWARD" | "POWER_FORWARD" | "CENTER";
export type Archetype = "SLASHER"
export type Player = {
    id: number;
    name: string;
    email: string;
    nickname: string;
    heights: number;
    weight: number;
    birthdate: string;
    level: number;
    experience: number;
    position: Position;
    achertype: Archetype;
}