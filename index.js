"use strict";

process.title = "SlimIO";

// Require Node.js Dependencies
const { performance } = require("perf_hooks");

// Require Third-party Dependencies
const Core = require("@slimio/core");
const { parseArg, argDefinition } = require("@slimio/arg-parser");

/** @type {ArgParser.ArgvResult<Agent.Argv>} */
const argv = parseArg([
    argDefinition("--silent", "Enable silent mode"),
    argDefinition("-a --autoreload [number=500]", "Configuration Autoreload delay")
]);

/**
 * @async
 * @function main
 * @returns {Promise<void>}
 */
async function main() {
    const startTime = performance.now();
    const core = await (new Core(__dirname, {
        silent: argv.get("silent"),
        autoReload: argv.get("autoreload")
    })).initialize();
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
