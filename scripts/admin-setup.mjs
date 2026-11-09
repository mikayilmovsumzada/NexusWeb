#!/usr/bin/env node
/**
 * Sets up (or changes) the admin login.
 *
 *   npm run admin:setup              set a new password; keep the existing 2FA secret if there is one
 *   npm run admin:setup -- --new-2fa set a new password and a new 2FA secret
 *   npm run admin:setup -- --print   don't touch .env.local, only print the values (for a server)
 *
 * The password is typed hidden and never stored; only its scrypt hash is written.
 */

import { randomBytes, scrypt } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ENV_FILE = path.resolve(".env.local");
const args = new Set(process.argv.slice(2));
const MIN_LENGTH = 12;

function askHidden(prompt) {
  return new Promise((resolve, reject) => {
    const stdin = process.stdin;
    if (!stdin.isTTY) return reject(new Error("Run this in an interactive terminal."));
    process.stdout.write(prompt);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    let value = "";
    const onData = (chunk) => {
      for (const ch of chunk) {
        if (ch === "\r" || ch === "\n") {
          stdin.setRawMode(false);
          stdin.pause();
          stdin.off("data", onData);
          process.stdout.write("\n");
          return resolve(value);
        }
        if (ch === "\u0003") {
          process.stdout.write("\n");
          process.exit(130);
        }
        if (ch === "\u007f" || ch === "\b") value = value.slice(0, -1);
        else if (ch >= " ") value += ch;
      }
    };
    stdin.on("data", onData);
  });
}

function hashPassword(password) {
  const N = 32768, r = 8, p = 1;
  const salt = randomBytes(16);
  return new Promise((resolve, reject) =>
    scrypt(password.normalize("NFC"), salt, 32, { N, r, p, maxmem: 256 * N * r }, (err, key) =>
      err ? reject(err) : resolve(`scrypt:${N}:${r}:${p}:${salt.toString("base64url")}:${key.toString("base64url")}`),
    ),
  );
}

function base32(buf) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = 0, value = 0, out = "";
  for (const byte of buf) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += alphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += alphabet[(value << (5 - bits)) & 31];
  return out;
}

function readEnv() {
  return existsSync(ENV_FILE) ? readFileSync(ENV_FILE, "utf8") : "";
}

function setVar(text, key, value) {
  const line = `${key}=${value}`;
  const re = new RegExp(`^${key}=.*$`, "m");
  if (re.test(text)) return text.replace(re, line);
  return `${text}${text && !text.endsWith("\n") ? "\n" : ""}${line}\n`;
}

const password = await askHidden(`New admin password (at least ${MIN_LENGTH} characters): `);
if (password.length < MIN_LENGTH) {
  console.error(`Too short. Use at least ${MIN_LENGTH} characters (a passphrase of 4+ words is ideal).`);
  process.exit(1);
}
if ((await askHidden("Repeat the password: ")) !== password) {
  console.error("The passwords don't match. Nothing was changed.");
  process.exit(1);
}

const hash = await hashPassword(password);
const env = readEnv();
const existingSecret = env.match(/^ADMIN_TOTP_SECRET=(\S+)$/m)?.[1];
const secret = !args.has("--new-2fa") && existingSecret ? existingSecret : base32(randomBytes(20));
const newSecret = secret !== existingSecret;

if (args.has("--print")) {
  console.log("\nAdd these to the server's environment:\n");
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  console.log(`ADMIN_TOTP_SECRET=${secret}`);
} else {
  let next = setVar(env, "ADMIN_PASSWORD_HASH", hash);
  next = setVar(next, "ADMIN_TOTP_SECRET", secret);
  writeFileSync(ENV_FILE, next, { mode: 0o600 });
  console.log(`\nSaved to ${ENV_FILE}. Restart the site for the change to take effect.`);
}

if (newSecret || args.has("--print")) {
  const label = encodeURIComponent("NexusWeb:admin");
  console.log("\nTwo-factor setup: open Google Authenticator, Microsoft Authenticator, 2FAS or similar,");
  console.log('choose "Enter a setup key" and type this key (time-based):\n');
  console.log(`    ${secret.match(/.{1,4}/g).join(" ")}\n`);
  console.log(`Or use this otpauth link: otpauth://totp/${label}?secret=${secret}&issuer=NexusWeb&digits=6&period=30\n`);
  console.log("Keep this key private. Anyone with it AND the password can sign in.");
} else {
  console.log("\nThe existing two-factor key was kept; your authenticator app keeps working.");
}
