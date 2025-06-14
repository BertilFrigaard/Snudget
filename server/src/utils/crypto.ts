import bcrypt from "bcrypt";

export async function hash(password: string): Promise<string> {
    return await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);
}
