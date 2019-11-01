process.title = "SlimIO";

// Require Node.js Dependencies
import { performance } from "perf_hooks";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Require Third-party Dependencies
import Core from "@slimio/core";
import ArgParser from "@slimio/arg-parser";

// Node.js CJS constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {ArgParser.ArgvResult<Agent.Argv>} */
const argv = ArgParser.parseArg([
    ArgParser.argDefinition("--silent", "Enable silent mode"),
    ArgParser.argDefinition("-a --autoreload [number=500]", "Configuration Autoreload delay")
]);

/**
 * @async
 * @function main
 * @returns {Promise<void>}
 */
async function main() {
    const startTime = performance.now();
    const [silent = false, autoReload = 500] = [argv.get("silent"), argv.get("autoreload")];
    const core = await (new Core(__dirname, { silent, autoReload })).initialize();
    const end = (performance.now() - startTime).toFixed(2);
    core.logger.writeLine(`SlimIO Agent started in ${end}ms`);

    // Handle exit signal!
    process.on("SIGINT", () => {
        core.logger.writeLine("Exiting SlimIO Agent (please wait)");
        core.exit().then(() => {
            setImmediate(process.exit);
        }).catch(function mainErrorHandler(error) {
            console.error(error);
            process.exit(1);
        });
    });
}
main().catch(console.error);
