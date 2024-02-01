import { Request, Response, NextFunction } from "express";
import { KnightNotFoundError } from "../validators/exceptions/KnightNotFoundError";

type MappedErrorTypes = Error | KnightNotFoundError;

export const globalErrorHandler = (
  err: MappedErrorTypes,
  _: Request,
  res: Response
) => {
  console.error("ERRO: ", err.message);
  if (err instanceof KnightNotFoundError) {
    return res.status(404).json({
      status: "error",
      message: "Não foi possivel localizar o Knight desejado.",
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Ocorreu um erro interno no servidor.",
  });
};
