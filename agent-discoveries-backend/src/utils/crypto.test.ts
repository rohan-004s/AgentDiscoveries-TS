import { hashPassword, doesPasswordMatch } from './crypto'

describe('The cryptography utility', () => {
  it('Correctly matches a password with its hashed version', async () => {
    const testPassword = 'test-password'
    expect(
      await doesPasswordMatch(
        testPassword,
        await hashPassword(testPassword),
      ),
    ).toBeTruthy()
  })

  it('Correctly does not match a password with a different hashed password', async () => {
    const hashedPassword = 'hashed-password'
    const wrongPassword = 'wrong-password'
    expect(
      await doesPasswordMatch(
        wrongPassword,
        await hashPassword(hashedPassword),
      ),
    ).toBeFalsy()
  })

  it('Returns false if a hashed password is bad', async () => {
    const badHash = 'Bad Hash'
    const wrongPassword = 'wrong-password'
    expect(await doesPasswordMatch(wrongPassword, badHash)).toBeFalsy()
  })
})
