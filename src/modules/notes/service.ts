import { BadRequestException } from 'http-exception-transformer/exceptions'
import { getCassandra } from '../../service/database/cassandra'
import { logger } from '../../service/logger/winston'
import { NOTES_CQL } from './commands'
import { CreateNoteInterface, NoteInterface, DeleteNoteInterface } from './interface'

class NoteService {
  /** to create a new note */
  static async create(note: CreateNoteInterface): Promise<any> {
    const { body, email, name, subject, title, type, url } = note
    try {
      const result = await getCassandra().execute(
        NOTES_CQL.INSERT,
        [email, name, Math.floor(Date.now() / 1000), subject, type, title, body, url],
        { prepare: true },
      )
      console.log(result)
      logger.info(`note.create.${email}.${title}.${url}`)
      return null
    } catch (e) {
      logger.error(`note.create.${email}.${title}.${url}`)
      logger.error(e)
      throw new BadRequestException()
    }
  }

  /** to get all notes from that webpage */
  static async find(url: string): Promise<Array<NoteInterface>> {
    try {
      const result = await getCassandra().execute(NOTES_CQL.SEARCH.BY.URL, [url], { prepare: true })
      return <Array<NoteInterface>>(<unknown>result.rows)
    } catch (e) {
      logger.error(`notes.search.${url}`)
      logger.error(e)
      return []
    }
  }

  static async remove({ email, timestamp, title }: DeleteNoteInterface): Promise<any> {
    try {
      const result = await getCassandra().execute(NOTES_CQL.DELETE.BY.TIME_EMAIL_TITLE, [timestamp, email, title])
      console.log(result)
      return result.rows
    } catch (e) {
      logger.error(`notes.delete.${timestamp}.${email}`)
      logger.error(e)
      return null
    }
  }
}

export { NoteService }
