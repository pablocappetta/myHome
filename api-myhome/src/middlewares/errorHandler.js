// Clase base para errores personalizados
class CustomError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

// Clases para distintos tipos de errores
class BadRequestError extends CustomError {
  constructor(log) {
    console.error(log);
    super(400, log);
  }
}

class UnauthorizedError extends CustomError {
  constructor(log) {
    console.error(log);
    super(401, "Unauthorized");
  }
}

class ConflictError extends CustomError {
  constructor(log) {
    console.error(log);
    super(409, log);
  }
}

class ForbiddenError extends CustomError {
  constructor(log) {
    console.error(log);
    super(403, log);
  }
}

class NotFoundError extends CustomError {
  constructor(log) {
    console.error(log);
    super(404, log);
  }
}

class InternalServerError extends CustomError {
  constructor(log) {
    console.error(log);
    super(500, log);
  }
}

// Función para manejar errores
function handleError(err, req, res, next) {
  const code = err.code || 500;
  const message = err.message || "Internal Server Error";
  res.status(code).json({ code, message });
}

module.exports = {
  CustomError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
  handleError,
  ConflictError,
};
