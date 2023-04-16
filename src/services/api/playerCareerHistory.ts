import { HOST } from ".";
import { CareerHistory } from "../../domain/CareerHistory";

const path = `${HOST}/api/v1/players_career_histories`;

export const create = async (
  careerHistory: CareerHistory,
  token: string,
): Promise<CareerHistory | any> =>
  fetch(`${path}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(careerHistory),
  }).then((response) => response.json());
