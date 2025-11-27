import vine from '@vinejs/vine'

const ValidateSchema = (schema) => {
  return async (req, res, next) => {
    try {
      const validator = vine.compile(schema);
      const validatedData = await validator.validate(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        error: "Invalid request body",
        details: error.message || error.errors || "Validation failed",
      });
    }
  };
};

export default ValidateSchema