var sum_to_n_a = function (n) {
  let sum = 0;
  for (let index = 1; index <= n; index++) {
    const element = index;
    sum += element;
  }
  return sum;
};

var sum_to_n_b = function (n) {
  return (n * (n + 1)) / 2;
};

var sum_to_n_c = function (n) {
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
};
