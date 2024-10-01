const createTokenUser = (user) => {
  return { phone: user.phone, userId: user.userId, role: user.role };
};

module.exports = createTokenUser;
