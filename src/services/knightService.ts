import KnightModel from "../db/models/knightModel";
import { IKnight, IKnightStats } from "../models/knight";
import { KnightNotFoundError } from "../validators/exceptions/KnightNotFoundError";
import { convertKnightToKnightStats } from "./mappers/knightStatsMapper";

class KnightService {
  async getAll(): Promise<IKnight[]> {
    return await KnightModel.find();
  }

  async getAllKnightsStats(): Promise<IKnightStats[]> {
    const knights = await KnightModel.find({ deleted: false });
    return knights.map(convertKnightToKnightStats);
  }

  async getAllHeroesStats(): Promise<IKnightStats[]> {
    const knights = await KnightModel.where({ deleted: true });

    return knights.map(convertKnightToKnightStats);
  }

  async getById(id: string): Promise<IKnight> {
    const result = await KnightModel.findById(id);
    if (!result) throw new KnightNotFoundError("Knight não encontrado");

    return result;
  }

  async add(newKnight: IKnight): Promise<void> {
    await KnightModel.create({
      ...newKnight,
      deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  async updateNickname(_id: string, nickname: string): Promise<void> {
    const knightToUpdate = await KnightModel.findById(_id);

    if (!knightToUpdate) throw new KnightNotFoundError("Knight não encontrado");

    knightToUpdate.nickname = nickname;
    knightToUpdate.updated_at = new Date();

    await KnightModel.updateOne({ _id }, knightToUpdate);
  }

  async delete(_id: string): Promise<void> {
    const knightToDelete = await KnightModel.findById(_id);

    if (!knightToDelete) throw new KnightNotFoundError("Knight não encontrado");

    knightToDelete.deleted = true;
    knightToDelete.deleted_at = new Date();

    await KnightModel.updateOne({ _id }, knightToDelete);
  }
}

export default new KnightService();
