export const removeFalsyFromObject = (input: Record<string, unknown>) => {
  const output: Record<string, unknown> = {};

  Object.keys(input).forEach((key) => {
    if (input[key]) {
      output[key] = input[key];
    }
  });

  return output;
};
