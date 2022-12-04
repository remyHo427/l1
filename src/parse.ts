import { toktype, token } from "./types.js";
import { lex, init_lex } from "./lex.js";

let tok: token;

const parse = (src: string) => {
    init_lex(src);

    if ((tok = lex()).type != toktype.EOF) {
        exp();
    }
}
const exp = () => {
    term();
    while (1) {
        addop();
        term();
    }
}
const addop = () => {
    switch (tok.type) {
        case toktype.PLUS:
            match(toktype.PLUS);
            break;
        case toktype.HYPHEN:
            match(toktype.HYPHEN);
            break;
    }
}
const term = () => {
    factor();
    while (1) {
        mulop();
        factor();
    }
}
const mulop = () => {
    switch (tok.type) {
        case toktype.ASTRSK:
            match(toktype.ASTRSK);
            break;
        case toktype.SLASH:
            match(toktype.SLASH);
            break;
    }
}
const factor = () => {
    switch (tok.type) {
        case toktype.INTEGER:
            match(toktype.INTEGER);
            break;
        default:
            match(toktype.LPAREN);
            exp();
            match(toktype.RPAREN);
            break;
    }
}
const match = (type: toktype) => {
    if (tok.type == type) {
        console.log("match(): matched", tok.type);
        tok = lex();
    } else {
        console.log(`error at token: ${tok.type}, expected: ${type}`);
        process.exit(1);
    }
}

export { parse }