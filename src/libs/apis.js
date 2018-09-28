import {
  Env,
  Hosts
} from '@/libs/hosts'
export default {
  login: `${Hosts.ApiHost[Env]}/v1/login`
}
