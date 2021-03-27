import { Request, Response, NextFunction } from 'express'
import { UnAuthorizedException } from 'http-exception-transformer/exceptions'

/**
 * middleware to ensure that the user has logged in
 */
export const ensureLoggedIn = () => (req: Request, res: Response, next: NextFunction) => {
  if (req.body.cookie === undefined) {
    throw new UnAuthorizedException('User must be logged in')
  }

  return next()
}
