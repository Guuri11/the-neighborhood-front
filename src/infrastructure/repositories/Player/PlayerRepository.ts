import { Archetype, Player } from "../../../domain/Player/Player";
import { PlayerRepositoryI } from "../../../domain/Player/PlayerRepository";
import { HOST } from "..";
import { OptionsInfraType } from "../types";

const path = `${HOST}/api/v1/players`;

const me = async (token: string): Promise<Player | any> =>
  fetch(`${path}/me`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => response.json());

const update = async (player: Player, { token }: OptionsInfraType): Promise<Player | any> =>
  fetch(`${path}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(player),
  }).then((response) => response.json());

const getArchetype = async ({ token }: OptionsInfraType): Promise<Archetype | any> =>
  fetch(`${path}/archetype`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => response.json());

const getPlayers = async (token: string): Promise<Player[] | any> =>
  fetch(`${path}?name`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => response.json());

const getOne = async (playerId: string, { token }: OptionsInfraType): Promise<Archetype | any> =>
  fetch(`${path}/${playerId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => response.json());

export const PlayerRepository: PlayerRepositoryI = {
  me,
  update,
  getArchetype,
  getPlayers,
  getOne,
};
