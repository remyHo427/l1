import { toktype, token } from "./types";
import { isspace, ispunct, isalpha, isdigit, isalnum } from "./ctype";
let sp: number;
let len: number;
let global_src: string;

let auto: boolean;
let type: toktype | undefined;

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
                        continue;
                    } else if (peekn() == '/') {
                        advn(2);
                        while (peek() != '\n' && !isend()) {
                            adv();
                        }
                        continue;
                    } else {
                        matchtok("/=", toktype.DIV_ASSIGN);
                        automatch(toktype.SLASH);
                        break;
                    }
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
                case '~':
                    return maketok(toktype.TILDE);
                case ',':
                    return maketok(toktype.COMMA);
                case '.':
                    matchtok("...", toktype.ELIPS);
                    automatch(toktype.DOT);
                    break;
                case '-':
                    matchtok("->", toktype.ARROW);
                    matchtok("--", toktype.MMINUS);
                    matchtok("-=", toktype.SUB_ASSIGN);
                    automatch(toktype.MINUS);
                    break;
                case '+':
                    matchtok("++", toktype.PPLUS);
                    matchtok("+=", toktype.ADD_ASSIGN);
                    automatch(toktype.PLUS);
                    break;
                case '&':
                    matchtok("&&", toktype.AND);
                    matchtok("&=", toktype.BA_ASSIGN);
                    automatch(toktype.BAND);
                    break;
                case '*':
                    matchtok("*=", toktype.MUL_ASSIGN);
                    automatch(toktype.ASTERISK);
                    break;
                case '!':
                    matchtok("!=", toktype.NEQUAL);
                    automatch(toktype.BANG);
                    break;
                case '/':
                    matchtok("/=", toktype.DIV_ASSIGN);
                    automatch(toktype.SLASH);
                    break;
                case '%':
                    matchtok("%=", toktype.REM_ASSIGN);
                    automatch(toktype.PERCENT);
                    break;
                case '<':
                    matchtok("<<=", toktype.LS_ASSIGN);
                    matchtok("<<", toktype.LSHIFT);
                    matchtok("<=", toktype.LTHANEQ);
                    automatch(toktype.LTHAN);
                    break;
                case '>':
                    matchtok(">>=", toktype.RS_ASSIGN);
                    matchtok(">>", toktype.RSHIFT);
                    matchtok(">=", toktype.LTHANEQ);
                    automatch(toktype.GTHAN);
                    break;
                case '=':
                    matchtok("==", toktype.EQUAL);
                    automatch(toktype.ASSIGN);
                    break;
                case '^':
                    matchtok("^=", toktype.BX_ASSIGN);
                    automatch(toktype.BXOR);
                    break;
                case '|':
                    matchtok("||", toktype.OR);
                    matchtok("|=", toktype.BO_ASSIGN);
                    automatch(toktype.BOR);
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
        advflag: boolean = true
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