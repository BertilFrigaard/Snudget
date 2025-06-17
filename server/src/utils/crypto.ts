import bcrypt from "bcrypt";
import crypto from "crypto";

export async function hash(password: string): Promise<string> {
    return await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);
}

export function generateToken(): string {
    return crypto.randomUUID();
}
