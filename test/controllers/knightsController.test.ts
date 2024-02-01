import request from "supertest";
import express from "express";
import {
  validateKnightCreateRequest,
  validateKnightUpdateRequest,
} from "../../src/validators/knightRequestValidator";
import {
  add,
  getAll,
  getById,
  remove,
  updateNickname,
} from "../../src/controllers/knightsController";
import { IKnight, IKnightStats } from "../../src/models/knight";
import knightService from "../../src/services/knightService";

jest.setTimeout(60000);

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

const mockKnightStats: IKnightStats = {
  age: 20,
  attack: 100,
  exp: 120,
  keyAttribute: "strength",
  name: "Tester",
  weapons_quantity: 2,
};

const app = express();
app.use(express.json());

app.post("/", validateKnightCreateRequest, add);
app.get("/", getAll);
app.get("/:id", getById);
app.delete("/", remove);
app.put("/:id", validateKnightUpdateRequest, updateNickname);

describe("Knight Controller - Validator", () => {
  it("Check validation - name", async () => {
    const knight = {
      ...mockKnight,
    };

    knight.name = "";
    const response = await request(app).post("/").send(knight);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].path).toBe("name");
  });

  it("Check validation - nickname", async () => {
    const knight = {
      ...mockKnight,
    };

    knight.nickname = "";
    const response = await request(app).post("/").send(knight);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].path).toBe("nickname");
  });

  it("Check validation - birthday", async () => {
    const knight = {
      ...mockKnight,
    };

    knight.birthday = "";
    const response = await request(app).post("/").send(knight);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].path).toBe("birthday");
  });

  it("Check validation - weapons", async () => {
    const knight = {
      ...mockKnight,
    };

    knight.weapons = [];
    const response = await request(app).post("/").send(knight);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].path).toBe("weapons");
  });

  it("Check validation - attribute lower 0", async () => {
    const knight = {
      ...mockKnight,
    };

    knight.attributes = {
      strength: 1,
      dexterity: -10,
      constitution: 1,
      intelligence: 10,
      wisdom: 19,
      charisma: 15,
    };

    const response = await request(app).post("/").send(knight);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].path).toBe("attributes.dexterity");
  });

  it("Check validation - attribute bigger than 20", async () => {
    const knight = {
      ...mockKnight,
    };

    knight.attributes = {
      strength: 1,
      dexterity: 21,
      constitution: 1,
      intelligence: 10,
      wisdom: 19,
      charisma: 15,
    };

    const response = await request(app).post("/").send(knight);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].path).toBe("attributes.dexterity");
  });

  it("Check validation - check weapons empty field - attr", async () => {
    const knight = {
      ...mockKnight,
    };

    knight.weapons = [
      {
        attr: "Fire",
        name: "",
        mod: 3,
        equipped: true,
      },
    ];

    const response = await request(app).post("/").send(knight);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].path).toBe("weapons");
  });

  it("Check validation - check weapons empty field - name", async () => {
    const knight = {
      ...mockKnight,
    };

    knight.weapons = [
      {
        attr: "Fire",
        name: "",
        mod: 3,
        equipped: true,
      },
    ];

    const response = await request(app).post("/").send(knight);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].path).toBe("weapons");
  });

  it("Check validation - check weapons empty field - mod", async () => {
    const knight = {
      ...mockKnight,
    };

    knight.weapons = [
      {
        attr: "Fire",
        name: "Bow",
        mod: -1,
        equipped: true,
      },
    ];

    const response = await request(app).post("/").send(knight);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].path).toBe("weapons");
  });

  it("Check validation - check keyAttribute", async () => {
    const knight = {
      ...mockKnight,
    };

    // TS não deixa deixa ficar vazio já que tem type de KeyAttribute
    knight.keyAttribute = "" as any;

    const response = await request(app).post("/").send(knight);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].path).toBe("keyAttribute");
  });
});

describe("KnightController - Add", () => {
  it("Check success - 201", async () => {
    const mockKnightAdd = jest.spyOn(knightService, "add");
    mockKnightAdd.mockResolvedValue(new Promise((resolve) => resolve()));

    const response = await request(app).post("/").send(mockKnight);
    expect(response.status).toBe(201);
  });
});

describe("KnightController - GetAll", () => {
  it("Check success - 200", async () => {
    const mockKnightGetAll = jest.spyOn(knightService, "getAllKnightsStats");
    mockKnightGetAll.mockResolvedValue(
      new Promise((resolve) => resolve([mockKnightStats]))
    );

    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockKnightStats]);
  });
});

describe("KnightController - GetById", () => {
  it("Check success - 200", async () => {
    const mockKnightGetById = jest.spyOn(knightService, "getById");
    mockKnightGetById.mockResolvedValue(
      new Promise((resolve) => resolve(mockKnight))
    );

    const response = await request(app).get("/123");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockKnight);
  });
});

describe("KnightController - Remove", () => {
  it("Check success - 200", async () => {
    const mockKnightDelete = jest.spyOn(knightService, "delete");
    mockKnightDelete.mockResolvedValue(new Promise((resolve) => resolve()));

    const response = await request(app).delete("/");
    expect(response.status).toBe(200);
  });
});

describe("KnightController - UpdateNickname", () => {
  it("Check success - 200", async () => {
    const mockKnightUpdateNickname = jest.spyOn(
      knightService,
      "updateNickname"
    );
    mockKnightUpdateNickname.mockResolvedValue(
      new Promise((resolve) => resolve())
    );

    const response = await request(app)
      .put("/123")
      .send({ nickname: "NewNickname" });
    expect(response.status).toBe(200);
  });

  it("Check validator - 400", async () => {
    const response = await request(app).put("/123").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].path).toBe("nickname");
  });
});
