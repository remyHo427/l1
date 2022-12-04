import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "util";
//
import { init_lex, lex, token, toktype } from "./lex.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const tab = [
    "EOF",
    "ERR",
    "AMPSND",
    "APSTRO",
    "ASTRSK",
    "BSLASH",
    "CCFLEX",
    "COLON",
    "COMMA",
    "DQUOTE",
    "EQUAL",
    "EXMARK",
    "GTHAN",
    "HYPHEN",
    "LBRACE",
    "LBRAKET",
    "LPAREN",
    "LTHAN",
    "NMSIGN",
    "PERIOD",
    "PLUS",
    "PRCENT",
    "QMARK",
    "RBRACE",
    "RBRKET",
    "RPAREN",
    "SCOLON",
    "SLASH",
    "TILDE",
    "USCORE",
    "VBAR",
    "BREAK",
    "CASE",
    "CHAR",
    "CONST",
    "CONTINUE",
    "DEFAULT",
    "DO",
    "DOUBLE",
    "ELSE",
    "ENUM",
    "FLOAT",
    "FOR",
    "IF",
    "INT",
    "LONG",
    "RETURN",
    "SHORT",
    "SIGNED",
    "SIZEOF",
    "STRUCT",
    "SWITCH",
    "TYPEDEF",
    "UNION",
    "UNSIGNED",
    "VOID",
    "WHILE",
    "INTEGER",
    "IDENT",
    "PRINT"
];
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
        
        init_lex(src);
        
        let tok: token;
        while ((tok = lex()).type != toktype.EOF) {
            console.log(tab[tok.type]);
            // console.log(`[tok type: ${
            //     tok.type
            // }${
            //     tok.numval != undefined ? `, numval: ${tok.numval}` : ""
            // }${
            //     tok.strval != undefined ? `, strval: ${tok.strval}` : ""
            // }]`);
        }
    }
})();