import { CreateNoteInterface, DeleteNoteInterface, NoteInterface } from './interface'
import { NoteService } from './service'

class NoteController {
  /** to create a new user */
  public static async createNote(note: CreateNoteInterface): Promise<NoteInterface> {
    return NoteService.create(note)
  }

  public static async getAllByUrl(url: string): Promise<Array<NoteInterface>> {
    return NoteService.find(url)
  }

  public static async remove(note: DeleteNoteInterface): Promise<NoteInterface> {
    return NoteService.remove(note)
  }
}

export { NoteController }
