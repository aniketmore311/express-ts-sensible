import express from 'express'
import { param } from 'express-validator'
import { catchAsync } from '../lib/utils'
import { validate } from '../lib/middleware/validate'
import createHttpError from 'http-errors'

export const userRouter = express.Router()

const users = [
  {
    name: 'john',
    id: 1,
  },
  {
    name: 'jane',
    id: 2,
  },
]

userRouter.get(
  '/',
  catchAsync(async (req, res) => {
    return res.json({
      data: users,
    })
  })
)

userRouter.get(
  '/:id',
  [param('id').isNumeric(), validate()],
  catchAsync(async (req, res) => {
    const id = Number(req.params.id)
    const filterUsers = users.filter((user) => {
      if (user.id == id) {
        return true
      } else {
        return false
      }
    })
    if (filterUsers.length < 1) {
      throw new createHttpError.NotFound('user not found')
    }
    return res.json({
      data: filterUsers[0],
    })
  })
)
