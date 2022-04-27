export const response = (args) => {
  const { res, code, data, errors } = args;
  if (data) {
    return res.status(code).json({
      status: "success",
      data,
    });
  }
  return res.status(code).json({
    status: "error",
    errors,
  });
};
