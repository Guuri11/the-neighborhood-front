import { CareerHistory } from "./CareerHistory";

export interface CareerHistoryRepositoryI {
    create: (careerHistory: CareerHistory, options?: any) => Promise<CareerHistory | any>;
}
