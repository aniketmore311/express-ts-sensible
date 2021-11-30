import path from 'path'

const ROOT_DIR = path.join(__dirname, '..', '..')
console.log(ROOT_DIR)

export const appConfig = {
  properties: {
    ROOT_DIR: ROOT_DIR,
  },
}
