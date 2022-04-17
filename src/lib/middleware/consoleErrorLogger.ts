import { ErrorRequestHandler } from 'express'

function color(text: string, color: string) {
  let colorCode = ''
  switch (color) {
    case 'red':
      colorCode = '31'
      break
    case 'green':
      colorCode = '32'
      break
    case 'blue':
      colorCode = '34'
      break
    default:
      throw new Error('Unknown color')
  }
  return `\x1b[${colorCode}m${text}\x1b[0m`
}

export function consoleErrorLogger({
  printStack,
}: {
  printStack?: boolean
}): ErrorRequestHandler {
  return function (err, req, res, next) {
    if (!printStack) {
      console.log(color('Error: ', 'red') + err.message)
    } else {
      console.log(err.stack || err.message)
    }
    next(err)
  }
}
