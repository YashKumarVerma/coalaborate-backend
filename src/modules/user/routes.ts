import express, { Request, Response } from 'express'
import { SuccessToResponseMapper } from '../../service/util/response.transformer'

const router = express.Router()

/**
 * declaring user routes that are nested under the /users scope
 */
router.get('/', async (req: Request, res: Response) => {
  res.json(SuccessToResponseMapper('NOT DEAD !'))
})

export default router
