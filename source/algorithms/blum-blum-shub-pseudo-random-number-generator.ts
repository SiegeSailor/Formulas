function next() {
  var cachedx = x;
  cachedx = cachedx * x;
  cachedx = cachedx % M;
  x = cachedx;
  return x;
}

//fast modPow
function powmod(base, exp, mod) {
  if (exp == 0) return 1;
  if (exp % 2 == 0) {
    return Math.pow(powmod(base, exp / 2, mod), 2) % mod;
  } else {
    return (base * powmod(base, exp - 1, mod)) % mod;
  }
}

//least common multiple.
function lcm(A) {
  //A - array with numbers (for example: [57,0,-45,-18,90,447])
  var n = A.length,
    a = Math.abs(A[0]);
  for (var i = 1; i < n; i++) {
    var b = Math.abs(A[i]),
      c = a;
    while (a && b) {
      a > b ? (a %= b) : (b %= a);
    }
    a = Math.abs(c * A[i]) / (a + b);
  }
  return a;
}

function generate(n) {
  //n-th number from generator, without calculating previous:
  return powmod(x0, powmod(2, n, lcm([p - 1, q - 1])), M);
}

const p = 7;
const q = 19;
const M = p * q; //update M

var x0 = 53; //p = 7, q = 19, x0 = 53; 	(53, 16, 123, 100, 25...)
var x = x0; //x0 as start nubmer, seed.

function _() {
  return next();
}

export default _;
