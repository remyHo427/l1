import { toktype, token } from "./types.js";
import { lex, init_lex } from "./lex.js";

enum gsym {
    STMTSEQ,
    STMT,
    DECL,
    EXP
};
const types = [ "STMTSEQ", "STMT", "DECL", "EXP" ];
let tok: token;

const parse = (src: string) => {
    init_lex(src);
    
    next();
    if (peek() != toktype.EOF) {
        stmtseq();
    }
}
const stmtseq = () => {
    stmt();
    while (stmt())
        ;
    produce(gsym.STMTSEQ);
}
const stmt = () => {
    if (decl()) {
        produce(gsym.STMT);
        return true;
    } else {
        exp();
        match(toktype.SCOLON);
        produce(gsym.STMT);
        return true;
    }
}
const decl = () => {
    if (check(toktype.INT)) {
        match(toktype.IDENT);
        if (check(toktype.EQUAL)) {
            exp();
        }
        match(toktype.SCOLON);
        produce(gsym.DECL);
        return true;
    }
    return false;
}
const exp = () => {
    switch (peek()) {
        case toktype.INTEGER:
        case toktype.IDENT:
            next();
            produce(gsym.EXP);
            return true;
    }
    return false;
}
const match = (type: toktype) => 
    type == tok.type ? 
        tok = lex() : 
        (console.log(`not expected: ${tok.type}`), process.exit(1));
const check = (type: toktype) =>
    type == tok.type ? (tok = lex(), true) : false;
const next = () => tok = lex();
const peek = () => tok.type;
const produce = (type: gsym) => console.log("grammar symbol: ", types[type]);

export { parse }