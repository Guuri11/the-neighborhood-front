import { HOST } from ".";
import { Player } from "../../domain/Player";

const path = `${HOST}/api/v1/players`;


export const me = async (token: string): Promise<Player | any> => fetch(`${path}/me`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  }).then((response) => response.json())

  export const update = async (player: Player, token: string): Promise<Player | any> => fetch(`${path}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(player)
  }).then((response) => response.json())