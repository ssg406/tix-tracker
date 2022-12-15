import { rest } from 'msw';

export const handlers = [
  rest.post('/api/v1/auth/register', (req, res, ctx) => {
    // persist token and user
    return res(
      // 200 status code
      ctx.status(200)
    );
  }),
  rest.post('/api/v1/auth/login', (req, res, ctx) => {
    // check authentication and user/pasds
    // if not auth:
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: 'Not authorized',
      })
    );
  }),
  rest.patch('/api/v1/auth/updateUser', null),
];
