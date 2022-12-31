import { init_lex, lex, token, toktype } from "../src/lex";

describe("testing boundry cases",  () => {
    it("should handle empty input", () => {
        init_lex("");
        expect(lex().type).toBe(toktype.EOF);
    });
    it("should handle input with only whitespace", () => {
        init_lex(`














            
        `);
        expect(lex().type).toBe(toktype.EOF);
    });
    it("should separate tokens base on whitespace", () => {
        init_lex(`
        d
        ouble
        = =
        /   =
        . .  .
        `);
        for (let tok: token; (tok = lex()).type != toktype.EOF; ) {
            expect([
                toktype.DOUBLE,
                toktype.EQUAL,
                toktype.DIV_ASSIGN,
                toktype.ELIPS
            ]).not.toContain(tok.type);
        }
    })
});