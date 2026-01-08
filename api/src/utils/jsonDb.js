import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../../data');

// Ensure data directory exists
async function ensureDataDir() {
    try {
        await fs.mkdir(dataDir, { recursive: true });
    } catch (error) {
        console.error("Error creating data directory:", error);
    }
}

ensureDataDir();

export class JsonDb {
    constructor(filename) {
        this.filePath = path.join(dataDir, filename);
    }

    async read() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return []; // Return empty array if file doesn't exist
            }
            throw error;
        }
    }

    async write(data) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
        } catch (error) {
            throw error;
        }
    }
}
