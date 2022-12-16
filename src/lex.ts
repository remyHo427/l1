import { toktype, token } from "./types.js";
import { isspace, ispunct, isalpha, isdigit, isalnum } from "./ctype.js";
let sp: number;             // src pointer
let len: number;            // src length
let global_src: string;     // src text

let auto: boolean;
let type: toktype | undefined;      // temporary variable for storing tok types

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
    let c: string[1], nc: string[1];
    let buf = [], bufp = 0, sbuf = "";
    auto = false;
    type = toktype.EOF;

    while (!isend()) {
        if (isspace(c = peek())) {
            adv();
            continue;
        } else if (ispunct(c)) {
            switch (c) {
                case '/':
                    if (peekn() == '*') {
                        advn(2);
                        while (peek() != '*' && peekn() != '/') {
                            adv();
                        }
                    } else if (peekn() == '/') {
                        advn(2);
                        while (peek() != '\n' && !isend()) {
                            adv();
                        }
                    }
                    continue;
                case '[':
                    return maketok(toktype.LBRACKET);
                case ']':
                    return maketok(toktype.RBRACKET);
                case '(':
                    return maketok(toktype.LPAREN);
                case ')':
                    return maketok(toktype.RPAREN);
                case '{':
                    return maketok(toktype.LBRACE);
                case '}':
                    return maketok(toktype.RBRACE);
                case '?':
                    return maketok(toktype.QMARK);
                case ':':
                    return maketok(toktype.COLON);
                case ';':
                    return maketok(toktype.SCOLON);
                case '.':
                    matchtok("...", toktype.ELIPS);
                    automatch(toktype.DOT);
                    break;
            }
            return maketok(type, undefined, undefined, auto);
        } else if (isdigit(c)) {
            if (c == "0") {
                adv();
                return maketok(toktype.CONST_INT, 0);
            } 
            do {
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
            adv();
            return (type = keywords[sbuf = buf.join("")]) ?
                maketok(type) :
                maketok(toktype.IDENT, undefined, sbuf);
        }
        
        adv();
    }

    adv();
    return maketok(toktype.EOF);
}
const init_lex = (src: string) => {
    sp = 0;
    len = src.length;
    global_src = src;
}
const maketok = (
        type: toktype, 
        numval?: number, 
        strval?: string,
        advflag: boolean = false
    ): token => {
    advflag ? adv() : null;
    return {
        type: type,
        numval: numval,
        strval: strval
    }
}
const matchtok = (matchs: string, matcht: toktype) => {
    let msp = 0;
    let c;
    let lexbegin = getpos();
    
    while ((c = peek()) && c == matchs[msp])
        adv(), msp++;

    msp == matchs.length ? type = matcht : setpos(lexbegin);
}
const automatch = (t: toktype) => !type ? (type = t, auto = true) : null;
const adv = () => sp++;
const advn = (n: number) => sp += n;
const peek = () => global_src[sp];
const peekn = () => global_src[sp+1];
const isend = () => sp >= len;
const getpos = () => sp;
const setpos = (n: number) => sp = n;

export { lex, init_lex, token, toktype };