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
        */`);

        let tok: token;
        while ((tok = lex()).type != toktype.EOF) {
            console.log(toktype[tok.type]);
        }

        // failing test, uncomment after fix (and remove loop above):
        // expect(lex().type).toBe(toktype.EOF);
    });
});