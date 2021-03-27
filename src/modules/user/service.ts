import { BadRequestException, NotFoundException } from 'http-exception-transformer/exceptions'
import { getCassandra } from '../../service/database/cassandra'
import { logger } from '../../service/logger/winston'
import { CreateUserInterface, UserInterface } from './interface'

class UserService {
  /** to list all users */
  static async findAll(): Promise<Array<UserInterface>> {
    try {
      const cql = 'SELECT firstname, lastname, email, role FROM hoohack.USER'
      const userList = await getCassandra().execute(cql)
      const dataRows = <Array<UserInterface>>(<unknown>userList.rows)
      logger.info('user.find.all')
      return dataRows
    } catch (e) {
      logger.error(e)
      throw new NotFoundException()
    }
  }

  /** to find details of given user by email */
  static async findOneByEmail(email: string): Promise<UserInterface | null> {
    try {
      const cql = 'SELECT firstname, lastname, email, role FROM hoohack.USER WHERE email = ?'
      const result = await getCassandra().execute(cql, [email], { prepare: true })
      if (result.rowLength === 0) {
        logger.warn(`user.find.one.${email}`)
        throw new NotFoundException('user not found')
      }

      logger.info(`user.find.one.${email}`)
      const dataRows = <UserInterface>(<unknown>result.rows[0])
      return dataRows
    } catch (e) {
      logger.error(`user.find.one.${email}`)
      logger.error(e)
      throw new NotFoundException()
    }
  }

  /** to find a user by email and password for login */
  static async findOneByEmailAndPassword(email: string, password: string): Promise<UserInterface> {
    try {
      const cql =
        'SELECT firstname, lastname, role, email FROM hoohack.USER WHERE email = ? AND password = ? ALLOW FILTERING'
      const result = await getCassandra().execute(cql, [email, password], { prepare: true })

      if (result.rowLength === 0) {
        logger.warn(`user.find.one.${email}.${password}`)
        throw new NotFoundException('user not found')
      }

      const dataRows = <UserInterface>(<unknown>result.rows[0])
      logger.info(`user.find.one.${email}.${password}`)
      return dataRows
    } catch (e) {
      logger.error(`user.find.one.${email}.${password}`)
      logger.error(e)
      throw new NotFoundException()
    }
  }

  /** to create a new user */
  static async create(user: CreateUserInterface): Promise<any> {
    try {
      const cql = `INSERT INTO hoohack.USER
    (firstname, lastname, email, password, role)
    VALUES (?,?,?,?,?)`
      const result = await getCassandra().execute(
        cql,
        [user.firstName, user.lastName, user.email, user.password, user.role],
        { prepare: true },
      )
      if (result.rowLength === 0) {
        logger.warn(`user.create.${user.email}`)
        throw new BadRequestException('error creating user')
      }

      return null
    } catch (e) {
      logger.error(`user.create.${user.email}`)
      logger.error(e)
      throw new BadRequestException()
    }
  }
}

export { UserService }
