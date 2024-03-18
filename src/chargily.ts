import { ChargilyClient } from "@chargily/chargily-pay";

export const CHARGILY_CLIENT = new ChargilyClient({
  api_key: import.meta.env.VITE_SECRET_KEY,
  mode: "test",
});
