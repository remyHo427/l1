type ctype = (c: string[1]) => number;

const _XA = 0x200;
const _XS = 0x100;
const _BB = 0x80;
const _CN = 0x40;
const _DI = 0x20;
const _LO = 0x10;
const _PU = 0x08;
const _SP = 0x04;
const _UP = 0x02;
const _XD = 0x01;
const XDI = (_DI|_XD);
const XLO = (_LO|_XD);
const XUP = (_UP|_XD);

const _ctype: number[] = [
    _BB, _BB, _BB, _BB, _BB, _BB, _BB, _BB,
    _BB, _CN, _CN, _CN, _CN, _CN, _BB, _BB,
    _BB, _BB, _BB, _BB, _BB, _BB, _BB, _BB,
    _BB, _BB, _BB, _BB, _BB, _BB, _BB, _BB,
    _SP, _PU, _PU, _PU, _PU, _PU, _PU, _PU,
    _PU, _PU, _PU, _PU, _PU, _PU, _PU, _PU,
    XDI, XDI, XDI, XDI, XDI, XDI, XDI, XDI,
    XDI, XDI, _PU, _PU, _PU, _PU, _PU, _PU,
    _PU, XUP, XUP, XUP, XUP, XUP, XUP, _UP,
    _UP, _UP, _UP, _UP, _UP, _UP, _UP, _UP,
    _UP, _UP, _UP, _UP, _UP, _UP, _UP, _UP,
    _UP, _UP, _UP, _PU, _PU, _PU, _PU, XLO,
    _PU, XLO, XLO, XLO, XLO, XLO, XLO, _LO,
    _LO, _LO, _LO, _LO, _LO, _LO, _LO, _LO, 
    _LO, _LO, _LO, _LO, _LO, _LO, _LO, _LO, 
    _LO, _LO, _LO, _PU, _PU, _PU, _PU, _BB,
];

const isalnum: ctype = (c) => 
    _ctype[c.charCodeAt(0) as number] & (_DI|_LO|_UP|_XA);
const isalpha: ctype = (c) => 
    _ctype[c.charCodeAt(0) as number] & (_LO|_UP|_XA);
const iscntrl: ctype = (c) => 
    _ctype[c.charCodeAt(0) as number] & (_BB|_CN);
const isdigit: ctype = (c) => 
    _ctype[c.charCodeAt(0) as number] & (_DI);
const isgraph: ctype = (c) => 
    _ctype[c.charCodeAt(0) as number] & (_DI|_LO|_PU|_UP|_XA);
const islower: ctype = (c) => 
    _ctype[c.charCodeAt(0) as number] & (_LO);
const isprint: ctype = (c) => 
    _ctype[c.charCodeAt(0) as number] & (_DI|_LO|_PU|_SP|_UP|_XA);
const ispunct: ctype = (c) => 
    _ctype[c.charCodeAt(0) as number] & (_PU);
const isspace: ctype = (c) => 
    _ctype[c.charCodeAt(0) as number] & (_CN|_SP|_XS);
const isupper: ctype = (c) => 
    _ctype[c.charCodeAt(0) as number] & (_UP);
const isxdigit: ctype = (c) => 
    _ctype[c.charCodeAt(0) as number] & (_XD);

export { 
    isalnum, 
    isalpha, 
    iscntrl, 
    isdigit, 
    isgraph, 
    islower, 
    isprint,
    ispunct, 
    isspace,
    isupper,
    isxdigit,
}