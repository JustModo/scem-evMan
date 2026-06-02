import { existsSync, readFileSync } from "fs";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { createError } from "../core/errors";
import { parseEnv } from "../core/config";
import type { Paths } from "../core/types";

let mongoClient: MongoClient | null = null;

function getMongoUri(paths: Paths): string {
  if (existsSync(paths.envFile)) {
    const env = parseEnv(readFileSync(paths.envFile, "utf8"));
    if (env.MONGODB_URI) return env.MONGODB_URI;
  }
  return "mongodb://mongo:27017/pomelo";
}

async function getDb(paths: Paths) {
  const uri = getMongoUri(paths);
  if (!mongoClient) {
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();
  }
  return mongoClient.db();
}

export async function listUsers(paths: Paths) {
  const db = await getDb(paths);
  const users = await db
    .collection("users")
    .find({}, { projection: { passwordHash: 0 } })
    .sort({ createdAt: -1 })
    .toArray();
  return users;
}

export async function createUser(paths: Paths, body: any) {
  const { name, email, password, role } = body;
  if (!email || !password) {
    throw createError("Email and password are required", 1);
  }

  const db = await getDb(paths);
  const existing = await db.collection("users").findOne({ email });
  if (existing) {
    throw createError("User with this email already exists", 1);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const now = new Date();
  const doc = {
    email,
    passwordHash,
    name: name || "",
    role: role === "admin" ? "admin" : "user",
    registeredContests: [],
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection("users").insertOne(doc);
  return {
    _id: result.insertedId.toString(),
    email: doc.email,
    name: doc.name,
    role: doc.role,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export async function updateUser(paths: Paths, id: string, body: any) {
  const db = await getDb(paths);
  const update: Record<string, any> = { updatedAt: new Date() };

  if (body.name !== undefined) update.name = body.name;
  if (body.email !== undefined) update.email = body.email;
  if (body.role !== undefined) update.role = body.role;
  if (body.password) {
    update.passwordHash = await bcrypt.hash(body.password, 10);
  }

  const result = await db
    .collection("users")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after", projection: { passwordHash: 0 } },
    );

  if (!result) {
    throw createError("User not found", 1);
  }

  return result;
}

export async function deleteUser(paths: Paths, id: string) {
  const db = await getDb(paths);
  const result = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 0) {
    throw createError("User not found", 1);
  }
}
