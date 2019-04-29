const actionLogger = store => next => action => {
  console.log("action triggered:", action);
  next(action);
};

export default actionLogger;
