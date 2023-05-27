import { Player } from "../domain/Player/Player";
import { PlayerRepositoryI } from "../domain/Player/PlayerRepository";
import { OptionsInfraType } from "../infrastructure/repositories/types";

type ResourceIdType = string | number;

export type PlayerServiceType = {
    me: (repository: PlayerRepositoryI, resourceId: ResourceIdType) => Promise<any>;
    update: (repository: PlayerRepositoryI, player: Player, options: OptionsInfraType) => Promise<any>;
    getArchetype: (repository: PlayerRepositoryI, options: OptionsInfraType) => Promise<any>;
    getPlayers: (repository: PlayerRepositoryI, options: OptionsInfraType) => Promise<any>;
    getOne: (repository: PlayerRepositoryI, resourceId: ResourceIdType, options: OptionsInfraType) => Promise<any>;
}

export const PlayerService = {
    me: (repository: PlayerRepositoryI, resourceId: ResourceIdType) => repository.me(resourceId),
    update: (repository: PlayerRepositoryI, player: Player, options: OptionsInfraType) => repository.update(player, options),
    getArchetype: (repository: PlayerRepositoryI, options: OptionsInfraType) => repository.getArchetype(options),
    getPlayers: (repository: PlayerRepositoryI, options: OptionsInfraType) => repository.getPlayers(options),
    getOne: (repository: PlayerRepositoryI, resourceId: ResourceIdType, options: OptionsInfraType) => repository.getOne(resourceId,options),
}
