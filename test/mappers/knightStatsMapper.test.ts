import moment from "moment";
import { IKnight } from "../../src/models/knight";
import {
  getKnightAgeByBirthday,
  getKnightAttack,
  getKnightExp,
} from "../../src/services/mappers/knightStatsMapper";

const mockKnight: IKnight = {
  _id: "7ea1c7bd-4c8d-4dea-8e24-25e4cd183d96",
  name: "Mauricio Gregorio",
  nickname: "Mau",
  birthday: "1998-08-03",
  weapons: [
    {
      attr: "Fire",
      name: "Bow",
      mod: 3,
      equipped: true,
    },
  ],
  attributes: {
    strength: 1,
    dexterity: 2,
    constitution: 1,
    intelligence: 10,
    wisdom: 19,
    charisma: 15,
  },
  keyAttribute: "constitution",
};

describe("KnightStatsMapper - Birthday", () => {
  it("Check birthday 1 year old 1 day left for his birthday", () => {
    const birthday = moment()
      .subtract(2, "years")
      .add(1, "days")
      .format("YYYY-MM-DD");

    const result = getKnightAgeByBirthday(birthday);

    expect(result).toBe(1);
  });

  it("Check birthday 2 years old 1 day after his birthday", () => {
    const birthday = moment()
      .subtract(2, "years")
      .subtract(1, "days")
      .format("YYYY-MM-DD");

    const result = getKnightAgeByBirthday(birthday);

    expect(result).toBe(2);
  });

  it("Check birthday invalid date", () => {
    const birthday = moment()
      .subtract(2, "years")
      .subtract(1, "days")
      .format("DD-MM-YYYY");

    const result = () => getKnightAgeByBirthday(birthday);

    expect(result).toThrow(Error);
    expect(result).toThrow("Invalid Knight birthday");
  });
});

describe("KnightStatsMapper - Attack", () => {
  it("Check knight attack - Strength", () => {
    const knight: IKnight = {
      ...mockKnight,
    };

    knight.weapons[0].mod = 3;
    knight.attributes.strength = 13;
    knight.keyAttribute = "strength";

    const result = getKnightAttack(knight);
    expect(result).toBe(14);
  });
});

describe("KnightStatsMapper - Exp", () => {
  it("Check knight exp", () => {
    const AGE = 10;
    const result = getKnightExp(AGE);

    expect(result).toBe(265);
  });

  it("Check knight exp - before 7", () => {
    const AGE = 6;
    const result = getKnightExp(AGE);

    expect(result).toBe(0);
  });
});
