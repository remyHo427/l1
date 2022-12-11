import { toktype, token } from "./types.js";
import { isspace, ispunct, isalpha, isdigit, isalnum } from "./ctype.js";
let sp: number;             // src pointer
let len: number;            // src length
let global_src: string;     // src text

let c: string[1];                   // current character
let nc: string[1];                  // next character
let buf: string[];                  // buffer, for storing arrays of characters
let bufp: number;
let type: toktype | undefined;      // temporary variable for storing tok types
let sbuf: string;                   // string buffer, for storing strings

const keywords: Record<string, toktype> = {
    "auto" : toktype.AUTO, 
    "break" : toktype.BREAK, 
    "case" : toktype.CASE, 
    "char" : toktype.CHAR, 
    "const" : toktype.CONST, 
    "continue" : toktype.CONTINUE, 
    "default" : toktype.DEFAULT, 
    "do" : toktype.DO, 
    "double" : toktype.DOUBLE, 
    "else" : toktype.ELSE, 
    "enum" : toktype.ENUM, 
    "extern" : toktype.EXTERN, 
    "float" : toktype.FLOAT, 
    "for" : toktype.FOR, 
    "goto" : toktype.GOTO, 
    "if" : toktype.IF, 
    "inline" : toktype.INLINE, 
    "int" : toktype.INT, 
    "long" : toktype.LONG, 
    "register" : toktype.REGISTER, 
    "return" : toktype.RETURN, 
    "short" : toktype.SHORT, 
    "signed" : toktype.SIGNED, 
    "static" : toktype.STATIC, 
    "struct" : toktype.STRUCT, 
    "switch" : toktype.SWITCH, 
    "typedef" : toktype.TYPEDEF, 
    "union" : toktype.UNION, 
    "unsigned" : toktype.UNSIGNED, 
    "void" : toktype.VOID, 
    "volatile" : toktype.VOLATILE, 
    "while" : toktype.WHILE, 
    "_bool" : toktype._BOOL, 
    "_complex" : toktype._COMPLEX, 
    "_imaginary" : toktype._IMAGINARY,
};

const lex = () => {
    buf = [];
    bufp = 0;

    while (!isend()) {
        if (isspace(c = peek())) {
            adv();
            continue;
        } else if (ispunct(c)) {
            
        } else if (isdigit(c)) {
            if (c == "0") {
                return maketok(toktype.CONST_INT, 0);
            } else do {
                buf[bufp++] = c;
                adv();
            } while ((c = peek()) && isdigit(c));
            return maketok(toktype.CONST_INT, Number.parseInt(buf.join("")));
        } else if (isalpha(c)) {
            buf[bufp++] = c;
            while ((nc = peekn()) && isalnum(nc)) {
                adv();
                buf[bufp++] = nc;
            }
            return (type = keywords[sbuf = buf.join("")]) ?
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