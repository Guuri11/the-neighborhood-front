import { PlayerRepositoryI } from "../../../domain/Player/PlayerRepository";
import { Archetype, Player } from "../../../domain/Player/Player";
import { getData, storeData } from "../../../ui/hooks/useAsyncStorage";
import { OptionsInfraType } from "../types";
import { MockData } from "../../mocks";

export const PlayerLocalRepository: PlayerRepositoryI = {
  me: async function (token: string): Promise<Player | any> {
    if (!token) {
      throw new Error("Unauthorized.");
    }

    const player = {
      id: 1,
      name: await getData("mock-user-name"),
      email: await getData("userEmail"),
      nickname: await getData("mock-user-nickname"),
      height: await getData("mock-user-height"),
      weight: await getData("mock-user-weight"),
      birthdate: await getData("mock-user-birthdate"),
      level: await getData("mock-user-level"),
      experience: await getData("mock-user-experience"),
      position: await getData("mock-user-position"),
      gender: await getData("mock-user-gender"),
      archetype: await getData("mock-user-archetype"),
    };

    return player;
  },
  update: async function (player: Player, { token }: OptionsInfraType): Promise<Player | any> {
    if (!token) {
      throw new Error("Unauthorized.");
    }

    storeData("mock-user-name", player.name);
    storeData("userEmail", player.email);
    storeData("mock-user-nickname", player.nickname);
    storeData("mock-user-height", player.height.toString());
    storeData("mock-user-weight", player.weight.toString());
    storeData("mock-user-birthdate", player.birthdate);
    storeData("mock-user-level", player.level?.toLocaleString() || "1");
    storeData("mock-user-experience", player.experience?.toLocaleString() || "0");
    storeData("mock-user-position", player.position);
    storeData("mock-user-gender", player.gender);
    storeData("mock-user-archetype", player.archetype || "null");
    return Promise.resolve(player);
  },
  getArchetype: async function ({ token }: OptionsInfraType): Promise<Archetype | any> {
    if (!token) {
      throw new Error("Unauthorized.");
    }
    return new Promise<Archetype>((resolve, reject) => {
      setTimeout(() => {
        storeData("mock-user-archetype", "SLASHING_PLAYMAKER");
        resolve("SLASHING_PLAYMAKER");
      }, 1000);
    });
  },
  getPlayers: function (token: string): Promise<Player[] | any> {
    if (!token) {
      throw new Error("Unauthorized.");
    }
    return new Promise<Player[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(MockData.players);
      }, 1000);
    });
  },
  getOne: function (playerId: string | number, { token }: OptionsInfraType): Promise<Player | any> {
    if (!token) {
      throw new Error("Unauthorized.");
    }
    return new Promise<Player>((resolve, reject) => {
      setTimeout(() => {
        resolve(MockData.players.find((player) => player.id === playerId));
      }, 1000);
    });
  },
};
