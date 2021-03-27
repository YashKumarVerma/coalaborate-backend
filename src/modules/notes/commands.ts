import config from 'config'

const namespace = config.get('schema.namespace')

export const NOTES_CQL = {
  /** to insert new value into system */
  INSERT: `INSERT INTO ${namespace}.note
  (email, name, timestamp, subject, type, title, body, url)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,

  /** to get all data for said URL */
  SEARCH: {
    BY: {
      URL: `SELECT * FROM ${namespace}.note WHERE url = ?`,
    },
  },

  /** to delete a note */
  DELETE: {
    BY: {
      TIME_EMAIL_TITLE: `DELETE FROM ${namespace}.note
      WHERE timestamp = ? AND email = ? AND title = ?`,
    },
  },
}
