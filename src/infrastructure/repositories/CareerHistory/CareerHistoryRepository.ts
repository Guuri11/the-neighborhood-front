import { CareerHistory } from "../../../domain/CareerHistory/CareerHistory";
import { CareerHistoryRepositoryI } from "../../../domain/CareerHistory/CareerHistoryRepository";
import { HOST } from "..";
import { OptionsInfraType } from "../types";

const path = `${HOST}/api/v1/players_career_histories`;


const create = async (
    careerHistory: CareerHistory,
    { token }: OptionsInfraType,
  ): Promise<CareerHistory | any> =>
    fetch(`${path}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(careerHistory),
    }).then((response) => response.json());


export const CareerHistoryRepository: CareerHistoryRepositoryI = {
    create,
}
