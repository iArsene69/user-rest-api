
import { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run --allow-net --allow-read --allow-env --allow-sys src/app.ts",
      desc: "run my app.ts file",
    },
  },
};

export default config;