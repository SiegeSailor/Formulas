export function _(left: bigint, right: bigint) {
  const recursion = (left: bigint, right: bigint) => {
    if (right == BigInt(0)) return [left, BigInt(1), BigInt(0)];

    const arrayOfResult = _(right, left % right);
    return [
      arrayOfResult[0],
      arrayOfResult[2],
      arrayOfResult[1] - (left / right) * arrayOfResult[2],
    ];
  };

  return recursion(left, right);
}
