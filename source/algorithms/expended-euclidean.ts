function _(left: number, right: number) {
  const recursion = (left: number, right: number) => {
    if (right == 0) return [left, 1, 0];

    const arrayOfResult = _(right, left % right);
    return [
      arrayOfResult[0],
      arrayOfResult[2],
      arrayOfResult[1] - (left / right) * arrayOfResult[2],
    ];
  };

  return recursion(left, right);
}

export default _;
