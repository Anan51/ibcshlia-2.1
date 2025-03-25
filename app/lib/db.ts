import path from "path";
import Database from "better-sqlite3";
import fs from "fs"

const dbPath = path.join(process.cwd(), "app/data/users.db");
console.log(dbPath);
const tablePath = path.join(process.cwd(), "app/lib/tables.sql");
export const db = new Database(dbPath, {
    verbose: console.log,
});

if (db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().length == 0) {
    db.pragma('journal_mode = WAL');
    const tableQueries = fs.readFileSync(tablePath, "utf8");
    db.exec(tableQueries)
}