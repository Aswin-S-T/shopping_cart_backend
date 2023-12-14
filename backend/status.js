module.exports = {
  successResponse: {
    status: 200,
    data: null,
    message: "success",
    success: true,
  },
  errorResponse: {
    status: 400,
    data: null,
    message: "failed",
    success: false,
  },
  forebiddenResponse: {
    status: 403,
    data: null,
    message: "User already exists",
    success: false,
  },
};
