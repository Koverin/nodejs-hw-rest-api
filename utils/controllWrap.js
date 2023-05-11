const controllWrap = (controll) => {
  const wrap = async (req, res, next) => {
    try {
      await controll(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return wrap;
};

module.exports = controllWrap;
