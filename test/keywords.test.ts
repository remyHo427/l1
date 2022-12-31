import { init_lex, lex, toktype, token } from "../src/lex";

const keyword_types: toktype[] = [
    toktype.AUTO, 
    toktype.BREAK, 
    toktype.CASE, 
    toktype.CHAR, 
    toktype.CONST, 
    toktype.CONTINUE, 
    toktype.DEFAULT, 
    toktype.DO, 
    toktype.DOUBLE, 
    toktype.ELSE, 
    toktype.ENUM, 
    toktype.EXTERN, 
    toktype.FLOAT, 
    toktype.FOR, 
    toktype.GOTO, 
    toktype.IF, 
    toktype.INLINE, 
    toktype.INT, 
    toktype.LONG, 
    toktype.REGISTER, 
    toktype.RETURN, 
    toktype.SHORT, 
    toktype.SIGNED, 
    toktype.STATIC, 
    toktype.STRUCT, 
    toktype.SWITCH, 
    toktype.TYPEDEF, 
    toktype.UNION, 
    toktype.UNSIGNED, 
    toktype.VOID, 
    toktype.VOLATILE, 
    toktype.WHILE, 
    toktype._BOOL, 
    toktype._COMPLEX, 
    toktype._IMAGINARY,
];

describe("testing keyword tokens", () => {
    it("recognize every keyword", () => {
        init_lex(`
            auto break case char const continue default do
            double else enum extern float for goto if inline
            int long register return short signed static struct switch
            typedef union unsigned void volatile while _bool _complex
            _imaginary
        `);
        let tok: token;
        let recognized_types: toktype[] = [];
        while ((tok = lex()).type != toktype.EOF) {
            expect(keyword_types).toContain(tok.type);
            recognized_types.push(tok.type);
        }
        expect(recognized_types.length).toEqual(keyword_types.length);
    });
    it("is case sensitive", () => {
        init_lex(`
            AUTO BREAK CASE CHAR CONST CONTINUE DEFAULT DO
            DOUBLE ELSE ENUM EXTERN FLOAT FOR GOTO IF INLINE
            INT LONG REGISTER RETURN SHORT SIGNED STATIC STRUCT SWITCH
            TYPEDEF UNION UNSIGNED VOID VOLATILE WHILE _BOOL _COMPLEX
            _IMAGINARY
            
            Auto Break caSe ChaR ConSt COntInUe dEfaUlt Do
            DoubLe ElSe Enum extERn fLoAt foR GotO If INline
            iNt Long ReGIsTEr RETurN sHOrt SiGNeD staTic StrUCT sWItCh
            tYpEDeF Union unsIgnED VoID voLatile wHilE _Bool _ComPlex
            _iMAGinARY
        `);

        let tok: token;
        while ((tok = lex()).type != toktype.EOF) {
            expect(keyword_types).not.toContain(tok.type);
        }
    });
    it("always recongize the longest keyword", () => {
        init_lex(`
            double
        `);
        expect(lex().type).toBe(toktype.DOUBLE);
    });
})