import { init_lex, lex, token, toktype } from "../src/lex";

describe("testing literals...", () => {
    it("should recognize 01 as two integer literals", () => {
        init_lex("01");
        expect(lex().type).toBe(toktype.CONST_INT);
        expect(lex().type).toBe(toktype.CONST_INT);
        expect(lex().type).toBe(toktype.EOF);
    });
    it("should recognize simple integer literals", () => {
        init_lex(`
            0 1 2 3 4 5 6 7 8 9 10 20 30 40 50
            60 70 80 90 100
            11 12 13 14 15 16 17 18 19 
            21 22 23 24 25 26 27 28 29
            31 32 33 34 35 36 37 38 39
            41 42 43 44 45 46 47 48 49
            51 52 53 54 55 56 57 58 59
            61 62 63 64 65 66 67 68 69
            71 72 73 74 75 76 77 78 79
            81 82 83 84 85 86 87 88 89
            91 92 93 94 95 96 97 98 99
            
            10
            100
            1000
            10000
            100000
            1000000
            10000000
            100000000
            1000000000
            10000000000
            100000000000
            1000000000000
            10000000000000
            100000000000000
            1000000000000000
            10000000000000000
            100000000000000000
            1000000000000000000
            
            123456789
            987654321
        `);

        let tok: token;
        while ((tok = lex()).type != toktype.EOF) {
            expect(tok.type).toBe(toktype.CONST_INT);
            expect(tok.numval).not.toBe(NaN);
        }
    });
});