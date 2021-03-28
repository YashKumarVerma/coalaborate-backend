import express, { Request, Response } from 'express'
import { logger } from '../../service/logger/winston'
import { SuccessToResponseMapper } from '../../service/util/response.transformer'
import { LoginTokenData } from '../auth/interface'
import { NoteController } from './controller'
import { CreateNoteInterface } from './interface'

const router = express.Router()

/** to fetch details of any given user */
router.post('/:subject/:type', async (req: Request, res: Response) => {
  const { subject, type } = req.params
  const { email, name }: LoginTokenData = req.body.cookie
  const { body, title, url }: CreateNoteInterface = req.body.payload

  const data = await NoteController.createNote({
    subject,
    type,
    body,
    title,
    url,
    name,
    email,
  })

  res.json(SuccessToResponseMapper(data))
})

/** to create a new user */
router.post('/url', async (req: Request, res: Response) => {
  const { url } = req.body.payload
  console.log(req.body)
  const data = await NoteController.getAllByUrl(url)
  logger.info(`note.find.all.${url}`)
  res.json(SuccessToResponseMapper(data))
})

export default router
