import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET =
  process.env.JWT_SECRET ||
  'supersecretjwtkeythatshouldbemorecomplexinproduction'

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}

export const generateAuthToken = (userId: string, email: string): string => {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '1h' })
}

export const verifyAuthToken = (
  token: string
): { userId: string; email: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string
      email: string
    }
    return decoded
  } catch (error) {
    return null
  }
}
