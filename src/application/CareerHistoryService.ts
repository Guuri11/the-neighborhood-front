import { CareerHistory } from "../domain/CareerHistory/CareerHistory";
import { CareerHistoryRepositoryI } from "../domain/CareerHistory/CareerHistoryRepository";
import { OptionsInfraType } from "../infrastructure/repositories/types";

export type CareerHistoryServiceType = {
    create: (repository: CareerHistoryRepositoryI, careerHistory: CareerHistory, options?: OptionsInfraType) => Promise<any>;
}

export const CareerHistoryService = {
    create: (repository: CareerHistoryRepositoryI, careerHistory: CareerHistory, options?: OptionsInfraType) => repository.create(careerHistory, options)
}
