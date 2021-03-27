export interface NoteInterface {
  /** author details ! cassaandra does not support joins :( */
  name: string
  email: string

  /** auto generated timestamp of note */
  timestamp: number

  /** details about note */

  /** course / subject  */
  subject: string

  /** check ./types for different possible values of this */
  type: string

  /** title and body of note */
  title: string
  body: string

  url: string
}

export interface CreateNoteInterface {
  subject: string
  type: string
  title: string
  body: string
  url: string
  name: string
  email: string
}

export interface DeleteNoteInterface {
  email: string
  timestamp: string
  title: number
}
