import '@testing-library/jest-dom/extend-expect'
import { server, cleanup } from '@/utils/test'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
