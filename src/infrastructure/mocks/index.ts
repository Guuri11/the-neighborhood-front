import { generateRandomDate } from "../../application/utils/generateRandomDate";
import { generateRandomString } from "../../application/utils/generateRandomString";
import { getRandomNumberInRange } from "../../application/utils/getRandomNumberInRage";
import { Archetype, Gender, Player, Position } from "../../domain/Player/Player";

export const randomPlayer = (): Player => {
  const positions: Position[] = [
    "CENTER",
    "POINT_GUARD",
    "POWER_FORWARD",
    "SHOOTING_GUARD",
    "SMALL_FORWARD",
  ];
  const genders: Gender[] = ["female", "male", "other"];
  const archetypes: Archetype[] = [
    "ALL_AROUND_SUPERSTAR",
    "ATHLETIC_FINISHING_CENTER",
    "DEFENSIVE_POINT_GUARD",
    "DEFENSIVE_SPECIALIST",
    "GLASS_CLEANER",
    "THREE_AND_D_POINT_GUARD",
  ];

  const randomPosition: Position = positions[Math.floor(Math.random() * positions.length)];
  const randomGender: Gender = genders[Math.floor(Math.random() * genders.length)];
  const randomArchetype: Archetype = archetypes[Math.floor(Math.random() * archetypes.length)];

  const player: Player = {
    id: Math.floor(Math.random() * 1000),
    name: generateRandomString(8),
    email: generateRandomString(8) + "@example.com",
    nickname: generateRandomString(6),
    height: getRandomNumberInRange(150, 200),
    weight: getRandomNumberInRange(50, 100),
    birthdate: generateRandomDate(),
    level: getRandomNumberInRange(1, 10),
    experience: getRandomNumberInRange(0, 1000),
    position: randomPosition,
    gender: randomGender,
    archetype: randomArchetype,
  };

  return player;
};

const Players = ():Player[] => {
    const players = [];
    for (let index = 0; index < 10; index++) {
        players.push(randomPlayer())
    }
    return players;
}

export const MockData = {
  players: Players(),
};
