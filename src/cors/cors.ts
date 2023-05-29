import { load, CorsOptionsDelegate } from "../../lib.ts";
const env = await load();
const WHITELIST = env["WHITELIST"];

const sleep = (ms: number) => {
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const whitelist = WHITELIST;

const corsOptionsDelegate: CorsOptionsDelegate<Request> = async (request) => {
  const isOriginAllowed = whitelist.includes(
    request.headers.get("origin") ?? ""
  );

  await sleep(3000);

  return { origin: isOriginAllowed };
};

export default corsOptionsDelegate;
