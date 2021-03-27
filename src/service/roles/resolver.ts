import { Request } from 'express'
import { logger } from '../logger/winston'
import { ROLE } from './types'

export const resolveRole = (req: Request): string => {
  if (req.body.cookie === false) {
    logger.info(`operating as role: ${ROLE.STUDENT}`)
    return ROLE.STUDENT
  }

  if (req.body.cookie.role === undefined) {
    logger.info(`operating as role: ${ROLE.STUDENT}`)
    return ROLE.STUDENT
  }

  logger.info(`operating as role: ${req.body.cookie.role}`)
  return req.body.cookie.role
}
