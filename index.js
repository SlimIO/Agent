/* eslint-disable no-loop-func */
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
 * @function errorHandler
 * @param {!Error} error
 * @returns {void}
 */
function errorHandler(error) {
    console.error(error);
    process.exit(1);
}

/**
 * @async
 * @function main
 * @returns {Promise<void>}
 */
async function main() {
    let exitTriggered = false;

    const startTime = performance.now();
    const [silent = false, autoReload = 500] = [argv.get("silent"), argv.get("autoreload")];
    const core = await (new Core(__dirname, { silent, autoReload })).initialize();
    const end = (performance.now() - startTime).toFixed(2);
    core.logger.writeLine(`SlimIO Agent started in ${end}ms`);

    // Handle exit signal!
    for (const signalName of ["SIGINT", "SIGTERM"]) {
        process.once(signalName, () => {
            if (exitTriggered) {
                return;
            }
            exitTriggered = true;
            core.logger.writeLine("Exiting SlimIO Agent (please wait)");
            core.exit().then(() => setImmediate(process.exit)).catch(errorHandler);
        });
    }
}
main().catch(console.error);
