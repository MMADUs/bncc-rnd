const HttpErrorType = {
  400: { phrase: "Bad Request" },
  401: { phrase: "Unauthorized" },
  402: { phrase: "Payment Required" },
  403: { phrase: "Forbidden" },
  404: { phrase: "Not Found" },
  405: { phrase: "Method Not Allowed" },
  406: { phrase: "Not Acceptable" },
  407: { phrase: "Proxy Authentication Required" },
  408: { phrase: "Request Timeout" },
  409: { phrase: "Conflict" },
  410: { phrase: "Gone" },
  411: { phrase: "Length Required" },
  412: { phrase: "Precondition Failed" },
  413: { phrase: "Payload Too Large" },
  414: { phrase: "URI Too Long" },
  415: { phrase: "Unsupported Media Type" },
  416: { phrase: "Range Not Satisfiable" },
  417: { phrase: "Expectation Failed" },
  418: { phrase: "I'm a teapot" },
  429: { phrase: "Too Many Requests" },
  500: { phrase: "Internal Server Error" },
  501: { phrase: "Not Implemented" },
  502: { phrase: "Bad Gateway" },
  503: { phrase: "Service Unavailable" },
  504: { phrase: "Gateway Timeout" },
  505: { phrase: "HTTP Version Not Supported" },
};

const GetPhrase = (code) => {
  return HttpErrorType[code]?.phrase || "an error occured";
};

const PrismaErrorType = {
  P2000: { message: "Field value too long", statusCode: 400 },
  P2001: { message: "Record not found", statusCode: 404 },
  P2002: { message: "Unique constraint violation", statusCode: 409 },
  P2003: { message: "Foreign key violation", statusCode: 400 },
  P2004: { message: "Constraint failed", statusCode: 400 },
  P2005: { message: "Invalid field value", statusCode: 400 },
  P2006: { message: "Invalid provided value", statusCode: 400 },
  P2007: { message: "Data validation error", statusCode: 400 },
  P2011: { message: "Null constraint violation", statusCode: 400 },
  P2016: { message: "Query interpretation error", statusCode: 400 },
  P2018: { message: "Record not found for query", statusCode: 404 },
  P2021: { message: "Table/view does not exist", statusCode: 500 },
  P2022: { message: "Column does not exist", statusCode: 500 },
  P2025: { message: "Dependent record(s) not found", statusCode: 404 },
  OTHER: { message: "Database error occurred", statusCode: 500 },
};

const PrismaError = (code) => {
  return PrismaErrorType[code] || PrismaErrorType.OTHER;
};

const HandleError = (code, error, res) => {
  console.log(error);
  if (error.code) {
    const prismaError = PrismaError(error.code);
    const phrase = GetPhrase(prismaError.statusCode);
    res.status(prismaError.statusCode).json({
      error: phrase,
      message: prismaError.message,
    });
  } else {
    const phrase = GetPhrase(code);
    res.status(code).json({
      error: phrase,
      message: error.message,
    });
  }
};

export default HandleError;
