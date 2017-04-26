const expireTime = 10000 * 60; //本地电脑时间有问题，所以设置10分钟比较久

module.exports = function (req, res, next) {
  res.header('Access-Control-Expose-Headers', 'access-token');
  const now = Date.now();

  let unauthorized = true;
  const token = req.headers['access-token'];
  if (token) {
    const expired = now - token > expireTime;
    if (!expired) {
      unauthorized = false;
      res.header('access-token', now);
    }
  }

  if (unauthorized) {
    res.sendStatus(401);
  } else {
    next();
  }
};