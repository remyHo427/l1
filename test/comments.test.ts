import { init_lex, lex, toktype, token } from "../src/lex";

describe("testing comments", () => {
    it("should ignore legal tokens inside comments", () => {
        init_lex(`
        /*
        [ ] ( ) { } . -> ++ -- & *
        + - ~ ! / % << >> < > <= >=
        == != ^ | && || ? : ; ... = 
        *= /= %= += -= <<= >>= &= ^=
        |= ,
        auto break case char const continue default do
        double else enum extern float for goto if inline
        int long register return short signed static struct switch
        typedef union unsigned void volatile while _bool _complex
        _imaginary
        0 100 123456878
        a ap p q s len s1 s2 test_variable
        */
        // [ ] ( ) { } . -> ++ -- & *
        // + - ~ ! / % << >> < > <= >=
        // == != ^ | && || ? : ; ... = 
        // *= /= %= += -= <<= >>= &= ^=
        // |= ,
        // auto break case char const continue default do
        // double else enum extern float for goto if inline
        // int long register return short signed static struct switch
        // typedef union unsigned void volatile while _bool _complex
        // _imaginary
        // 0 100 123456878
        // a ap p q s len s1 s2 test_variable`);
        expect(lex().type).toBe(toktype.EOF);
    });
    it("should allow line comments in multi-line comments", () => {
        init_lex(`/*
        //
        //
        // //
        ////////
        //*/`);
        expect(lex().type).toBe(toktype.EOF);
    });
    it("should allow multi line comments in single line comments", () => {
        init_lex(`///**/`);
        expect(lex().type).toBe(toktype.EOF);
    });
    it("should allow consecutive inline comments", () => {
        init_lex("//////");
        expect(lex().type).toBe(toktype.EOF);
    });
    it("should handle empty comments", () => {
        init_lex("//");
        expect(lex().type).toBe(toktype.EOF);
        init_lex("/**/");
        expect(lex().type).toBe(toktype.EOF);
    });
});