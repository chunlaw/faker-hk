export const randomHkid = (seed: number): string => {
  const a = seed % 1000000 / 1000000
  const randomIndex = Math.floor(a * knownPrefixes.length);
  const prefix = knownPrefixes[randomIndex];

  let digit = ""
  for ( let i=0;i<6;++i ) {
    digit += Math.floor(seed / Math.pow(10, i)) % 10
  }

  const candidate = `${prefix}${digit}`;

  const checkDigit = calculateCheckDigit(`${candidate}`);

  return `${candidate}${checkDigit}`.toUpperCase().trim();
};

/*
 * source: https://accessinfo.hk/en/request/you_guan_xiang_gang_shen_fen_zhe_2
 */
const knownPrefixes: string[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "M",
  "N",
  "P",
  "R",
  "S",
  "T",
  "V",
  "W",
  "Y",
  "Z",
  "WX",
  "XA",
  "XB",
  "XC",
];

const checkPrefix = (prefix: string): boolean => {
  return knownPrefixes.some((value) => value === prefix);
};

const calculateCheckDigit = (candidate: string): string => {
  let checkDigit = (candidate.length === 8 ? candidate : ` ${candidate}`)
    .split("")
    .reduce((previousValue, currentValue, currentIndex) => {
      const weight = 9 - currentIndex;
      const value = getValue(currentValue);

      return previousValue + ((weight * value) % 11);
    }, 0);

  checkDigit = checkDigit % 11;

  if (checkDigit !== 0) {
    checkDigit = 11 - checkDigit;
  }

  return `${checkDigit === 10 ? "A" : checkDigit}`;
};

const A = "A".charCodeAt(0);
const Z = "Z".charCodeAt(0);

const getValue = (char: string): number => {
  const charCode = char.charCodeAt(0);

  if (char === " ") {
    return 36;
  } else if (!isNaN(parseInt(char))) {
    return parseInt(char);
  } else if (charCode >= A && charCode <= Z) {
    return charCode - A + 10;
  }

  throw new Error();
};