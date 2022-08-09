import { rest, RestRequest } from 'msw'

export const handlers = [
  rest.post(
    'https://abc.example.com/api/login',
    async (
      req: RestRequest<{ username: string; password: string }>,
      res,
      ctx
    ) => {
      if (!req.body?.password) {
        return res(
          ctx.delay(0),
          ctx.status(400),
          ctx.json({ message: 'Password required' })
        )
      }
      if (!req.body?.username) {
        return res(
          ctx.delay(0),
          ctx.status(400),
          ctx.json({ message: 'Username required' })
        )
      }

      return res(ctx.delay(0), ctx.json({ username: req.body.username }))
    }
  ),
]
