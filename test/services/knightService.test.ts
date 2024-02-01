import moment from "moment";
import { IKnight } from "../../src/models/knight";
import KnightModel from "../../src/db/models/knightModel";
import knightService from "../../src/services/knightService";
import { KnightNotFoundError } from "../../src/validators/exceptions/KnightNotFoundError";

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

describe("KnightService - getAll", () => {
  it("Check return list", async () => {
    const mockFind = [mockKnight];
    jest.spyOn(KnightModel, "find").mockReturnValueOnce(mockFind as any);

    const result = await knightService.getAll();
    expect(result[0]._id).toBe(mockFind[0]._id);
  });
});

describe("KnightService - getAllKnightStats", () => {
  it("Check return list", async () => {
    const mockFind = [mockKnight];
    jest.spyOn(KnightModel, "find").mockReturnValueOnce(mockFind as any);

    const result = await knightService.getAllKnightsStats();
    expect(result[0]._id).toBe(mockFind[0]._id);
  });
});

describe("KnightService - getById", () => {
  it("Check return list", async () => {
    jest.spyOn(KnightModel, "findById").mockReturnValueOnce(mockKnight as any);

    const result = await knightService.getById(mockKnight._id || "");

    expect(result._id).toBe(mockKnight._id);
  });

  it("Check not found", async () => {
    jest.spyOn(KnightModel, "findById").mockReturnValueOnce(undefined as any);

    expect(async () => {
      await knightService.getById(mockKnight._id || "");
    }).rejects.toThrow(KnightNotFoundError);
  });
});

describe("KnightService - add", () => {
  it("Check return list", async () => {
    jest.spyOn(KnightModel, "create").mockImplementation();

    expect(knightService.add(mockKnight)).resolves.not.toThrow();
  });
});

describe("KnightService - update", () => {
  it("Check return list", async () => {
    jest.spyOn(KnightModel, "findById").mockReturnValueOnce(mockKnight as any);
    jest.spyOn(KnightModel, "findByIdAndUpdate").mockImplementation();

    expect(
      knightService.updateNickname(mockKnight._id || "", "NewNickname")
    ).resolves.not.toThrow();
  });

  it("Check not found", async () => {
    jest.spyOn(KnightModel, "findById").mockReturnValueOnce(undefined as any);

    expect(async () => {
      await knightService.updateNickname(mockKnight._id || "", "NewNickname");
    }).rejects.toThrow(KnightNotFoundError);
  });
});

describe("KnightService - delete", () => {
  it("Check return list", async () => {
    jest.spyOn(KnightModel, "findById").mockReturnValueOnce(mockKnight as any);
    jest.spyOn(KnightModel, "findByIdAndDelete").mockImplementation();

    expect(knightService.delete(mockKnight._id || "")).resolves.not.toThrow();
  });

  it("Check not found", async () => {
    jest.spyOn(KnightModel, "findById").mockReturnValueOnce(undefined as any);

    expect(async () => {
      await knightService.delete(mockKnight._id || "");
    }).rejects.toThrow(KnightNotFoundError);
  });
});
