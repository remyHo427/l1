import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "util";
//
import { parse } from "./parse.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
    const files = 
        await promisify(fs.readdir)(
                path.join(__dirname, "../l1")
            );

    for (const sf of files.filter((f) => f.endsWith(".l1"))) {
        console.log(`***    ${sf}   ***`);
        const src = 
            await promisify(fs.readFile)(
                path.join(__dirname, `../l1/${sf}`), "ascii"
            );
        parse(src);
    }
})();