export const response = (args) => {
  const { res, code, data, errors } = args;
  if (data) {
    return res.status(code).json(data);
  }
  return res.status(code).json(errors);
};
