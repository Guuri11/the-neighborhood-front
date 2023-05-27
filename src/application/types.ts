import { AuthenticationServiceType } from "./AuthenticationService"
import { CareerHistoryServiceType } from "./CareerHistoryService"
import { PlayerServiceType } from "./PlayerService"

export type ServiceNameType = "authentication" | "careerHistory" | "player"

export type ServiceType = AuthenticationServiceType | PlayerServiceType | CareerHistoryServiceType
