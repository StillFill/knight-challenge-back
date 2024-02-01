import { IKnight, IKnightStats } from "../../models/knight";
import moment from "moment";
// Em um ambiente produtivo faria sentido colocar essas modificações no banco de dados ou arquivo de configuração
// Assim facilitaria modificações nos stats do jogo
const ModMap = [
  {
    minRange: 0,
    maxRange: 8,
    mod: -2,
  },
  {
    minRange: 9,
    maxRange: 10,
    mod: -1,
  },
  {
    minRange: 11,
    maxRange: 12,
    mod: 0,
  },
  {
    minRange: 13,
    maxRange: 15,
    mod: 1,
  },
  {
    minRange: 16,
    maxRange: 18,
    mod: 2,
  },
  {
    minRange: 19,
    maxRange: 20,
    mod: 3,
  },
];

export const convertKnightToKnightStats = (knight: IKnight): IKnightStats => {
  const knightAge = getKnightAgeByBirthday(knight.birthday);
  return {
    _id: knight._id,
    name: knight.name,
    keyAttribute: knight.keyAttribute,
    weapons_quantity: knight.weapons.length,
    age: knightAge,
    attack: getKnightAttack(knight),
    exp: getKnightExp(knightAge),
  };
};

export const getKnightAgeByBirthday = (birthday: string) => {
  const date = moment(birthday, "YYYY-MM-DD", true);
  if (!date.isValid()) throw new Error("Invalid Knight birthday");

  return Math.floor(
    moment(new Date()).diff(moment(birthday, "YYYY-MM-DD"), "years", true)
  );
};

const getAttackMod = (keyAttribute: number) => {
  const attributeRange = ModMap.find(
    (a) => keyAttribute >= a.minRange && keyAttribute <= a.maxRange
  );

  // Talvez pensar melhor qual seria o cenario esperado caso o valor seja maior que 20
  // (obs: adicionado trava de valor maximo de attributo ser 20 para evitar o cenario)
  if (!attributeRange) return 0;

  return attributeRange.mod;
};

export const getKnightAttack = (knight: IKnight) => {
  const keyAttribute = knight.attributes[knight.keyAttribute];
  const equippedWeaponMod = knight.weapons.find((a) => a.equipped)?.mod || 0;
  return 10 + getAttackMod(keyAttribute) + equippedWeaponMod;
};

export const getKnightExp = (age: number) => {
  const ageGap = age - 7;
  return Math.floor((ageGap < 0 ? 0 : ageGap) * Math.pow(22, 1.45));
};
