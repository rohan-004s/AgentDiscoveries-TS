import app from './app'
import config from './config'

const server = app.listen(config.http.port, config.http.hostname, () => {
  console.log(
    `API is running at ` +
      `http://${config.http.hostname}:${config.http.port} ` +
      `in ${config.environment}`,
  )
})

export default server
