// JavaScript code for Pollard p-1
// factorization Method

// function for
// calculating GCD
function gcd(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

// function for
// checking prime
function isPrime(n) {
  if (n <= 1) return false;
  if (n == 2 || n == 3) return true;
  if (n % 2 == 0) return true;
  for (var i = 3; i * i <= n; i += 2) if (n % i == 0) return false;
  return true;
}

// function to generate
// prime factors
function pollard(n) {
  // defining base
  let a = 2;

  // defining exponent
  let i = 2;

  // iterate till a prime factor is obtained
  while (true) {
    // recomputing a as required
    a = a ** i % n;

    // finding gcd of a-1 and n
    // using math function
    let d = gcd(a - 1, n);

    // check if factor obtained
    if (d > 1) {
      //return the factor
      return d;

      break;
    }
    // else increase exponent by one
    // for next round
    i += 1;
  }
}

// Driver code
let n = 41399374705903;

// temporarily storing n
let num = n;

// list for storing prime factors
let ans: number[] = [];

// iterated till all prime factors
// are obtained
while (true) {
  // function call
  let d = pollard(num);

  // add obtained factor to list
  ans.push(d);

  // reduce n
  let r = Math.floor(num / d);

  // check for prime
  if (isPrime(r)) {
    // both prime factors obtained
    ans.push(r);

    break;
  }
  // reduced n is not prime, so repeat
  else num = r;
}

// print the result
console.log("Prime factors of", n, "are", ans.join(" "));

export {};
