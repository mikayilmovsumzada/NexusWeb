import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "nexusweb",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-16",
    // No public *.workers.dev address or preview URLs: the site is served only on its own domain (to be attached).
    workersDev: false,
    previewUrls: false,
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      // Contact messages and admin sessions (src/server/db.ts). Created on first deploy.
      DB: bindings.d1({ name: "nexusweb" }),
      // Admin login (src/server/auth.ts). Set in production with `cf` secrets; locally in .dev.vars.
      // When either is missing the admin area returns 404.
      ADMIN_PASSWORD_HASH: bindings.secret(),
      ADMIN_TOTP_SECRET: bindings.secret(),
    },
  }),
});
