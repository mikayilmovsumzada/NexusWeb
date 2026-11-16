// Vite asset imports used on the server (see src/lib/og.tsx).
declare module "*?inline" {
  const dataUri: string;
  export default dataUri;
}
