const apiKeys = [process.env.API_KEY];

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers["auth-key"]; 

  if (!apiKey || !apiKeys.includes(apiKey)) {
    return res.status(403).json({
      warning: "This is REACT-NATIVES BACKEND - you should not be here :)",
    });
  }

  next(); // Proceed to the next middleware or route handler
};

module.exports = apiKeyMiddleware;
