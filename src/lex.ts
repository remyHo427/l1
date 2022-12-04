import { toktype, token } from "./types.js";
import { isspace, ispunct, isalpha, isdigit } from "./ctype.js";

let sp: number;             // src pointer
let len: number;            // src length
let global_src: string;     // src text

let c: string[1];                   // current character
let nc: string[1];                  // next character
let buf: string[];                  // buffer, for storing arrays of characters
let type: toktype | undefined;      // temporary variable for storing tok types
let sbuf: string;                   // string buffer, for storing strings

const keywords: Map<string, toktype> = new Map();
keywords.set("break", toktype.BREAK);
keywords.set("case", toktype.CASE);
keywords.set("char", toktype.CHAR);
keywords.set("const", toktype.CONST);
keywords.set("continue", toktype.CONTINUE);
keywords.set("default", toktype.DEFAULT);
keywords.set("do", toktype.DO);
keywords.set("double", toktype.DOUBLE);
keywords.set("else", toktype.ELSE);
keywords.set("enum", toktype.ENUM);
keywords.set("float", toktype.FLOAT);
keywords.set("for", toktype.FOR);
keywords.set("if", toktype.IF);
keywords.set("int", toktype.INT);
keywords.set("long", toktype.LONG);
keywords.set("return", toktype.RETURN);
keywords.set("short", toktype.SHORT);
keywords.set("signed", toktype.SIGNED);
keywords.set("sizeof", toktype.SIZEOF);
keywords.set("struct", toktype.STRUCT);
keywords.set("switch", toktype.SWITCH);
keywords.set("typedef", toktype.TYPEDEF);
keywords.set("union", toktype.UNION);
keywords.set("void", toktype.VOID);
keywords.set("unsigned", toktype.UNSIGNED);
keywords.set("while", toktype.WHILE);
// reserved words for testing
keywords.set("print", toktype.PRINT);

const punct: Record<string[1], toktype> = {
    '\'': toktype.APSTRO,
    ':': toktype.COLON,
    ',': toktype.COMMA,
    '"': toktype.DQUOTE,
    '{': toktype.LBRACE,
    '[': toktype.LBRKET,
    '(': toktype.LPAREN,
    '.': toktype.PERIOD,
    '?': toktype.QMARK,
    '}': toktype.RBRACE,
    ']': toktype.RBRKET,
    ')': toktype.RPAREN,
    ';': toktype.SCOLON,
    '+': toktype.PLUS,
    '-': toktype.HYPHEN,
};

const lex = () => {
    while (!isend()) {
        buf = [];

        if (isspace(c = peek())) {
            adv();
            continue;
        } else if (ispunct(c)) {
            // check single char punct tokens
            if (type = punct[c]) {
                return maketok(type);
            }
        } else if (c == '0') {
            return maketok(toktype.INTEGER, 0);
        } else if (isdigit(c)) {
            do {
                buf.push(c);
                adv();
            } while (isdigit(c = peek()));
            return maketok(toktype.INTEGER, Number.parseInt(buf.join("")));
        } else if (isalpha(c)) {
            buf.push(c);
            while (isalpha(nc = peekn()) || isdigit(nc)) {
                adv();
                buf.push(nc);
            }
            return (type = keywords.get(sbuf = buf.join(""))) ?
                maketok(type) :
                maketok(toktype.IDENT, undefined, sbuf);
        }
        
        adv();
    }

    return maketok(toktype.EOF);
}
const init_lex = (src: string) => {
    sp = 0;
    len = src.length;
    global_src = src;
}
const maketok = (type: toktype, numval?: number, strval?: string): token => {
    adv();
    return {
        type: type,
        numval: numval,
        strval: strval
    }
}
const adv = () => sp++;
const peek = () => global_src[sp];
const peekn = () => global_src[sp+1];
const isend = () => sp >= len;

export { lex, init_lex, token, toktype };