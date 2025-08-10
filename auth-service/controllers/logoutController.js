export const logout = (req, res) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: false, // set true in production with HTTPS
      sameSite: 'lax'
    })
    .status(200)
    .json({ message: 'Logged out successfully' });
};
