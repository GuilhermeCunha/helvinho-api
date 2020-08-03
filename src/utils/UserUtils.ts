import { User } from '@entities/User'
import LoginService from './LoginService'
interface UserInfos {
    email: string;
    username: string;
    password: string;
}
class UserUtils {
  async createAdminsIfNecessary () {
    const HelvinhoInfos: UserInfos = {
      email: 'helvinho@salvadorpiscinas.com.br',
      username: 'Helvinho',
      password: await LoginService.createHashedPassword(Math.random().toString(36).substring(12))
    }
    const HelvioInfos: UserInfos = {
      email: 'helvio@salvadorpiscinas.com.br',
      username: 'Helvio',
      password: await LoginService.createHashedPassword(Math.random().toString(36).substring(12))
    }

    this.adminFactory(HelvinhoInfos)
    this.adminFactory(HelvioInfos)
  }

  async adminFactory (userInfos: UserInfos): Promise<void> {
    const existentUser = await User.findOne({
      where: {
        email: userInfos.email
      }
    })
    if (!existentUser) {
      console.log(`Creating the admin : ${userInfos.email}`)
      const user = new User()
      user.role = 'admin'
      user.password = userInfos.password
      user.email = userInfos.email
      user.username = userInfos.username
      await user.save()
    } else {
      console.log(`The admin : ${userInfos.email} already exists`)
    }
  }
}

export default new UserUtils()
