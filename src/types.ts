export enum toktype { EOF = 0, ERR,
    AUTO,
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
    EXTERN,
    FLOAT,
    FOR,
    GOTO,
    IF,
    INLINE,
    INT,
    LONG,
    REGISTER,
    RESTRICT,
    RETURN,
    SHORT,
    SIGNED,
    SIZEOF,
    STATIC,
    STRUCT,
    SWITCH,
    TYPEDEF,
    UNION,
    UNSIGNED,
    VOID,
    VOLATILE,
    WHILE,
    _BOOL,
    _COMPLEX,
    _IMAGINARY,
    IDENT,
    CONST_INT,
    CONST_FLOAT,
    CONST_ENUM,
    CONST_CHAR,
    STRING,
    RBRACKET,       // [
    LBRACKET,       // ]
    RPAREN,         // (
    LPAREN,         // )
    RBRACE,         // {
    LBRACE,         // }
    DOT,            // .
    ARROW,          // ->
    PPLUS,          // ++
    MMINUS,         // --
    BAND,           // &
    ASTERISK,       // *
    PLUS,           // +
    MINUS,          // -
    TILDE,          // ~
    BANG,           // !
    SLASH,          // /
    PERCENT,        // %
    LSHIFT,         // <<
    RSHIFT,         // >>
    LTHAN,          // <
    GTHAN,          // >
    LTHANEQ,        // <=
    GTHANEQ,        // >=
    EQUAL,          // ==
    NEQUAL,         // !=
    BXOR,           // ^
    BOR,            // |
    AND,            // &&
    OR,             // ||
    QMARK,          // ?
    COLON,          // :
    SCOLON,         // ;
    ELIPS,          // ...
    ASSIGN,         // =
    MUL_ASSIGN,     // *=
    DIV_ASSIGN,     // /=
    REM_ASSIGN,      // %=
    ADD_ASSIGN,     // +=
    SUB_ASSIGN,     // -=
    LS_ASSIGN,      // <<=
    RS_ASSIGN,      // >>=
    BA_ASSIGN,      // &=
    BX_ASSIGN,      // ^=
    BO_ASSIGN,      // |=
    COMMA,          // ,
};
export interface token {
    type: toktype;
    numval?: number;
    strval?: string;
}