import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  refreshToken: process.env.REFRESH_TOKEN,
  jwtExpAccessToken: process.env.ACCESS_TOKEN_EXP,
  jwtExpRefreshToken: process.env.REFRESH_TOKEN_EXP,
  jwtLinkExpAccessToken: process.env.LINK_TOKEN_EXP,
}));
