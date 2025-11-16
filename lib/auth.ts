import { SignJWT, jwtVerify } from "jose";
import * as bcrypt from "bcryptjs";
import { prisma } from "./db";
import { NextRequest } from "next/server";

// Define UserRole manually (Prisma doesn't export it directly in this version)
type UserRole = "ADMIN" | "EDITOR";

// Auth token payload type
export interface AuthTokenPayload {
  userId: string;
  role: UserRole;
  email: string;
  [key: string]: unknown;
}

// JWT Secret key
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set. Please configure it in your .env file.");
}

const secret = new TextEncoder().encode(JWT_SECRET);

// Cookie name for authentication
export const AUTH_COOKIE_NAME = "reems_auth";

/**
 * Validates user credentials (email and password)
 * @param email User email
 * @param password Plain text password
 * @returns User object without password if valid, null otherwise
 */
export async function validateUserCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordValid) {
    return null;
  }

  // Return user without password
  const { hashedPassword, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Creates a JWT authentication token
 * @param user User object
 * @returns JWT token string
 */
export async function createAuthToken(user: { id: string; email: string; role: UserRole | string }) {
  const payload: AuthTokenPayload = {
    userId: user.id,
    role: user.role as UserRole,
    email: user.email,
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // 7 days
    .sign(secret);

  return token;
}

/**
 * Verifies a JWT authentication token
 * @param token JWT token string
 * @returns Token payload if valid, null otherwise
 */
export async function verifyAuthToken(token: string): Promise<AuthTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as AuthTokenPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Gets the current user from the request cookies
 * @param req NextRequest object
 * @returns User payload if authenticated, null otherwise
 */
export async function getCurrentUserFromRequest(req: NextRequest): Promise<AuthTokenPayload | null> {
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return await verifyAuthToken(token);
}

