import { Meta, body, param } from "express-validator";
import { Weapon } from "../models/knight";

const validateWeaponsRequest = (weapons: Weapon[]) => {
  const weaponsErrorMessage = 'Campo "Weapons" invalido';

  if (weapons.length === 0) throw new Error(weaponsErrorMessage);

  const invalidWeapons = weapons
    .map((weapon) => {
      if (
        !weapon.attr ||
        !weapon.name ||
        !weapon.mod ||
        weapon.mod < 0 ||
        weapon.equipped === undefined ||
        weapon.equipped === null ||
        typeof weapon.equipped !== "boolean"
      ) {
        return weapon;
      }

      return null;
    })
    .filter((a) => !!a);
  if (invalidWeapons.length > 0) {
    throw new Error(weaponsErrorMessage);
  }

  return true;
};

const validateKeyAttributeRequest = (keyAttribute: string, { req }: Meta) => {
  const { attributes } = req.body;

  const possibleAttributes = Object.keys(attributes);

  if (!possibleAttributes.includes(keyAttribute))
    throw new Error("Campo 'keyAttribute' invalido");

  return true;
};

const nicknameValidator = body("nickname")
  .notEmpty()
  .withMessage('O campo "nickname" não pode estar vazio.');

const weaponsValidators = [
  body("weapons")
    .notEmpty()
    .withMessage('Campo "weapons" não pode estar vazio.')
    .isArray()
    .withMessage('Campo "weapons" não é um Array.')
    .custom(validateWeaponsRequest)
    .withMessage('Campo "weapons" invalido.'),
];

const knightDataValidators = [
  body("name").notEmpty().withMessage('O campo "name" não pode estar vazio.'),
  nicknameValidator,
  body("birthday")
    .notEmpty()
    .withMessage('Campo "birthday" não pode estar vazio.')
    .isISO8601()
    .withMessage('O campo "birthday" deve ser uma data valida.'),
];

const attributesValidators = [
  body("attributes.strength")
    .isFloat({ min: 0, max: 20 })
    .withMessage('Campo "strenght" deve ter valor minimo de 0 e maximo de 20'),
  body("attributes.dexterity")
    .isFloat({ min: 0, max: 20 })
    .withMessage('Campo "dexterity" deve ter valor minimo de 0 e maximo de 20'),
  body("attributes.constitution")
    .isFloat({ min: 0, max: 20 })
    .withMessage(
      'Campo "constitution" deve ter valor minimo de 0 e maximo de 20'
    ),
  body("attributes.intelligence")
    .isFloat({ min: 0, max: 20 })
    .withMessage(
      'Campo "intelligence" deve ter valor minimo de 0 e maximo de 20'
    ),
  body("attributes.wisdom")
    .isFloat({ min: 0, max: 20 })
    .withMessage('Campo "wisdom" deve ter valor minimo de 0 e maximo de 20'),
  body("attributes.charisma")
    .isFloat({ min: 0, max: 20 })
    .withMessage('Campo "charisma" deve ter valor minimo de 0 e maximo de 20'),
  body("keyAttribute")
    .notEmpty()
    .withMessage('Campo "keyAttribute" não pode estar vazio.')
    .custom(validateKeyAttributeRequest)
    .withMessage('Campo "keyAttribute" invalido.'),
];

export const validateKnightCreateRequest = [
  nicknameValidator,
  ...knightDataValidators,
  ...weaponsValidators,
  ...attributesValidators,
];

export const validateKnightUpdateRequest = [nicknameValidator];
