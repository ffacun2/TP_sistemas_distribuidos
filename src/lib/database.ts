// app/lib/database.ts
import fs from "fs/promises";
import path from "path";
import { Pokemon } from "@/types/pokemon";

const DB_PATH = path.join(process.cwd(), "pokemones-DB.json");

class Database {

  private async readDB(): Promise<Pokemon[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data);
    } 
    catch (error) {
      // Si el archivo no existe, devolver array vacío
      return [];
    }
  }

  private async writeDB(data: Pokemon[]): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  async getAll(): Promise<Pokemon[]> {
    return await this.readDB();
  }

  async getById(id: number): Promise<Pokemon | undefined> {
    const data = await this.readDB();
    return data.find((item) => item.id === id);
  }

  async save(pokemon:Pokemon): Promise<Pokemon> {
    const data = await this.readDB();
    
    data.push(pokemon);
    await this.writeDB(data);
    return pokemon;
  }

  async delete(id: number): Promise<boolean> {
    const data = await this.readDB();
    const initialLength = data.length;
    const filtered = data.filter((item) => item.id !== id);
    console.log(filtered.length, initialLength)
    if (filtered.length === initialLength) {
      return false; // No se encontró el elemento
    }
    
    await this.writeDB(filtered);
    return true;
  }

}

export const db = new Database();