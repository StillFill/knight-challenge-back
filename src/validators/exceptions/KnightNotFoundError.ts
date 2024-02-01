export class KnightNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "KnightNotFoundError";
  }
}
