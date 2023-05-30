import { CareerHistory } from "../../../domain/CareerHistory/CareerHistory";
import { CareerHistoryRepositoryI } from "../../../domain/CareerHistory/CareerHistoryRepository";
import { getData, storeData } from "../../../ui/hooks/useAsyncStorage";
import { OptionsInfraType } from "../types";

export const CareerHistoryLocalRepository: CareerHistoryRepositoryI = {
  create: async function (careerHistory: CareerHistory, { token }: OptionsInfraType): Promise<CareerHistory | any> {
    if (!token) {
      throw new Error("Unauthorized.");
    }
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const careerHistoriesString = await getData("mock-users-careerhistories");
        if (careerHistoriesString) {
          const careerHistories = JSON.parse(careerHistoriesString) as CareerHistory[];
          careerHistories.push(careerHistory)
          storeData("mock-users-careerhistories", JSON.stringify(careerHistories));
        return;
        }
        storeData("mock-users-careerhistories", JSON.stringify([careerHistory]));
        resolve(careerHistory);
      }, 1000);
    });
  }
};
