export enum toktype {
    // pseudotokens
    EOF = 0,
    ERR,
    // punct
    AMPSND, // &    multi
    APSTRO, // '    used
    ASTRSK, // *    multi
    BSLASH, // \    not used
    CCFLEX, // ^    not used
    COLON,  // :    used
    COMMA,  // ,    used
    DQUOTE, // "    used
    EQUAL,  // =    multi
    EXMARK, // !    multi
    GTHAN,  // >    multi
    HYPHEN, // -    multi
    LBRACE, // {    used
    LBRKET, // [    used
    LPAREN, // (    used
    LTHAN,  // <    multi
    NMSIGN, // #    not used
    PERIOD, // .    used 
    PLUS,   // +    multi
    PRCENT, // %    multi
    QMARK,  // ?    used
    RBRACE, // }    used
    RBRKET, // ]    used
    RPAREN, // )    used
    SCOLON, // ;    used
    SLASH,  // /    multi
    TILDE,  // ~    not used
    USCORE, // _    not used
    VBAR,   // |    multi
    // reserved words
    BREAK,
    CASE,
    CHAR,
    CONST,
    CONTINUE,
    DEFAULT,
    DO,
    DOUBLE,
    ELSE,
    ENUM,
    FLOAT,
    FOR,
    IF,
    INT,
    LONG,
    RETURN,
    SHORT,
    SIGNED,
    SIZEOF,
    STRUCT,
    SWITCH,
    TYPEDEF,
    UNION,
    UNSIGNED,
    VOID,
    WHILE,
    // literals
    INTEGER,
    // misc
    IDENT,
    // reserved words for testing
    PRINT
};
export interface token {
    type: toktype;
    numval?: number;
    strval?: string;
}