import config from '../config'
import * as _ from 'lodash'

export default interface Properties {
  code: number
  responseError: string
  responseMessage: string
}

export class BaseApiError extends Error implements Properties {
  /**
   * The HTTP error code we respond with.
   */
  code: number
  responseError: string
  responseMessage: string

  constructor(message: string, properties?: Partial<Properties>) {
    super(message)
    this.name = 'ApiError'
    this.code = 500
    this.responseError = 'server_error'
    this.responseMessage =
      config.environment === 'development' ? message : ''
    this.setProperties(properties)
  }

  setProperties(properties?: Partial<Properties>) {
    if (!properties) return

    Object.keys(properties).forEach((key) =>
      _.set(this, key, _.get(properties, key)),
    )
  }

  getResponseJson(): { error: string; error_description: string } {
    return {
      error: this.responseError,
      error_description: this.responseMessage,
    }
  }
}

export class Unauthorised extends BaseApiError {
  constructor(message = 'Unauthorised', properties?: Partial<Properties>) {
    super(message)
    this.name = 'Unauthorised'
    this.responseError = 'unauthorised'
    this.responseMessage = message
    this.code = 401
    this.setProperties(properties)
  }
}
