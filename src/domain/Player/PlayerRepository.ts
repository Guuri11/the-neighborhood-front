import { Archetype, Player } from "./Player";

export interface PlayerRepositoryI {
    me: (indentifier: string | number) => Promise<Player | any>;
    update: (player: Player, options: any) => Promise<Player | any>;
    getArchetype: (options: any) => Promise<Archetype | any>;
    getPlayers: (options: any) => Promise<Player[] | any>;
    getOne: (indentifier: string | number, options: any) => Promise<Player | any>;
}
