import express, { Request, Response } from 'express'
import { ForbiddenException } from 'http-exception-transformer/exceptions'
import { logger } from '../../service/logger/winston'
import { check } from '../../service/roles/definitions'
import { resolveRole } from '../../service/roles/resolver'
import { SuccessToResponseMapper } from '../../service/util/response.transformer'
import { LoginTokenData } from '../auth/interface'
import { UserController } from './controller'
import { CreateUserInterface } from './interface'

const router = express.Router()

/**
 * declaring user routes that are nested under the /users scope
 */
router.get('/', async (req: Request, res: Response) => {
  if (!check.can(resolveRole(req)).readAny('profile').granted) {
    throw new ForbiddenException('Not enough rights to list of all students')
  }
  const data = await UserController.getAllUsers()
  res.json(SuccessToResponseMapper(data))
})

/** to fetch details of any given user */
router.get('/:email', async (req: Request, res: Response) => {
  const { email } = req.params
  const cookieData: LoginTokenData = req.body.cookie

  if (
    check.can(resolveRole(req)).readAny('profile').granted ||
    (check.can(resolveRole(req)).readOwn('profile').granted && email === cookieData.email)
  ) {
    const data = await UserController.getUser(email)
    res.json(SuccessToResponseMapper(data))
  }

  throw new ForbiddenException('Not enough rights to list student details')
})

/** to create a new user */
router.post('/', async (req: Request, res: Response) => {
  if (!check.can(resolveRole(req)).createOwn('profile').granted) {
    throw new ForbiddenException('Not allowed to create a new profile')
  }

  const userDetails: CreateUserInterface = req.body.payload
  const data = await UserController.createUser(userDetails)
  logger.info(`user.created.${userDetails.email}`)
  res.json(SuccessToResponseMapper(data))
})


export default router
