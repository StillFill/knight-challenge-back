import { NextFunction, Request, Response } from "express";
import knightService from "../services/knightService";
import { validationResult } from "express-validator";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filter } = req.query;
    if (filter === "heroes") {
      res.status(200).send(await knightService.getAllHeroesStats());
    } else {
      res.status(200).send(await knightService.getAllKnightsStats());
    }
  } catch (err) {
    return next(err);
  }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    await knightService.add(req.body);
    res.status(201).send("Knight cadastrado com sucesso!");
  } catch (err) {
    return next(err);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const knightId = req.params.id;
  try {
    const knight = await knightService.getById(knightId);
    res.status(200).send(knight);
  } catch (err) {
    return next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const knightId = req.params.id;
  try {
    await knightService.delete(knightId);
    res.status(200).send("Knight removido com sucesso!");
  } catch (err) {
    return next(err);
  }
};

export const updateNickname = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const knightId = req.params.id;
  const updatedKnightNickname = req.body.nickname;

  try {
    await knightService.updateNickname(knightId, updatedKnightNickname);
    res.status(200).send("Knight atualizado com sucesso");
  } catch (err) {
    return next(err);
  }
};
