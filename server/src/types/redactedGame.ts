import { Game } from "./game";

export type RedactedGame = Omit<Game, "password_hash">;

export type PartialRedactedGame<T extends keyof RedactedGame> = Pick<RedactedGame, T>;
