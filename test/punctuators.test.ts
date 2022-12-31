import { toktype, lex, init_lex, token } from "../src/lex";

const punctuators_types: toktype[] = [
    toktype.RBRACKET,
    toktype.LBRACKET,
    toktype.RPAREN,
    toktype.LPAREN,
    toktype.RBRACE,
    toktype.LBRACE,
    toktype.DOT,
    toktype.ARROW,
    toktype.PPLUS,
    toktype.MMINUS,
    toktype.BAND,
    toktype.ASTERISK,
    toktype.PLUS,
    toktype.MINUS,
    toktype.TILDE,
    toktype.BANG,
    toktype.SLASH,
    toktype.PERCENT,
    toktype.LSHIFT,
    toktype.RSHIFT,
    toktype.LTHAN,
    toktype.GTHAN,
    toktype.LTHANEQ,
    toktype.GTHANEQ,
    toktype.EQUAL,
    toktype.NEQUAL,
    toktype.BXOR,
    toktype.BOR,
    toktype.AND,
    toktype.OR,
    toktype.QMARK,
    toktype.COLON,
    toktype.SCOLON,
    toktype.ELIPS,
    toktype.ASSIGN,
    toktype.MUL_ASSIGN,
    toktype.DIV_ASSIGN,
    toktype.REM_ASSIGN,
    toktype.ADD_ASSIGN,
    toktype.SUB_ASSIGN,
    toktype.LS_ASSIGN,
    toktype.RS_ASSIGN,
    toktype.BA_ASSIGN,
    toktype.BX_ASSIGN,
    toktype.BO_ASSIGN,
    toktype.COMMA
];

describe("testing punctuators", () => {
    it("recognize every punctuator", () => {
        init_lex(`
        [ ] ( ) { } . -> ++ -- & *
        + - ~ ! / % << >> < > <= >=
        == != ^ | && || ? : ; ... = 
        *= /= %= += -= <<= >>= &= ^=
        |= ,
        `);

        let tok: token;
        let recognized_types: toktype[] = [];

        while ((tok = lex()).type != toktype.EOF) {
            expect(punctuators_types).toContain(tok.type);
            recognized_types.push(tok.type);
        }
        
        expect(recognized_types.length).toEqual(punctuators_types.length);
    });

    it("always recognize the longest punctuators", () => {
        // ... .
        init_lex("...");
        expect(lex().type).toBe(toktype.ELIPS);

        // <<= << <= <
        init_lex("<<=");
        expect(lex().type).toBe(toktype.LS_ASSIGN);
        init_lex("<<");
        expect(lex().type).toBe(toktype.LSHIFT);
        init_lex("<=");
        expect(lex().type).toBe(toktype.LTHANEQ);

        // && &= &
        init_lex("&&");
        expect(lex().type).toBe(toktype.AND);
        init_lex("&=");
        expect(lex().type).toBe(toktype.BA_ASSIGN);

        // || |= |
        init_lex("||");
        expect(lex().type).toBe(toktype.OR);
        init_lex("|=");
        expect(lex().type).toBe(toktype.BO_ASSIGN);

        // ++ += +
        init_lex("+=");
        expect(lex().type).toBe(toktype.ADD_ASSIGN);
        init_lex("++");
        expect(lex().type).toBe(toktype.PPLUS);

        // -- -= -
        init_lex("--");
        expect(lex().type).toBe(toktype.MMINUS);
        init_lex("-=");
        expect(lex().type).toBe(toktype.SUB_ASSIGN);

        // *= *
        init_lex("*=");
        expect(lex().type).toBe(toktype.MUL_ASSIGN);

        // /= /
        init_lex("/=");
        expect(lex().type).toBe(toktype.DIV_ASSIGN);

        // %= %
        init_lex("%=");
        expect(lex().type).toBe(toktype.REM_ASSIGN);

        // ^= ^
        init_lex("^=");
        expect(lex().type).toBe(toktype.BX_ASSIGN);

        // != !
        init_lex("!=");
        expect(lex().type).toBe(toktype.NEQUAL); 
    });
});