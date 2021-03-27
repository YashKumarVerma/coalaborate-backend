import { AccessControl } from 'accesscontrol'
import { logger } from '../logger/winston'
import { ROLE } from './types'

const controller = new AccessControl()

controller
  .grant(ROLE.STUDENT)
  .createOwn('profile')
  .readOwn('profile')
  .readAny('profile')
  .updateOwn('profile')
  .createOwn('note')
  .readOwn('note')
  .deleteOwn('note')

controller.grant(ROLE.TEACHER).extend(ROLE.STUDENT).readAny('profile').readAny('note').updateAny('note')

controller.grant(ROLE.ADMIN).extend(ROLE.TEACHER).deleteAny('profile').updateAny('profile').deleteAny('note')

const roleStatusCheck = () => {
  logger.info(`All roles: ${controller.getRoles()}`)
  logger.info(`All resources: ${controller.getResources()}`)
}

export { controller as check, roleStatusCheck }
