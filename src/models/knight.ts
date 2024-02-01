export interface IKnight
  extends KnightId,
    KnightState,
    IKnightIdentity,
    Weapons,
    Attributes {}

interface KnightId {
  _id?: string;
}

interface KnightState {
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

interface IKnightIdentity {
  name: string;
  nickname: string;
  birthday: string; //YYYY-MM-DD
}

interface Weapons {
  weapons: Weapon[];
}

interface Attributes {
  attributes: AttributesTree;
  keyAttribute: KeyAttribute;
}

export interface Weapon {
  name: string;
  mod: number;
  attr: string;
  equipped: Boolean;
}

export interface AttributesTree {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface IKnightStats extends KnightId {
  name: string;
  age: number;
  weapons_quantity: number;
  keyAttribute: KeyAttribute;
  attack: number;
  exp: number;
}

type KeyAttribute = keyof AttributesTree;
