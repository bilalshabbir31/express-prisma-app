const calculateRequestProcessTime = (req, res, next) => {
  const start = Date.now();
  next();
  // action go here...
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
  console.log();
};

export default calculateRequestProcessTime;