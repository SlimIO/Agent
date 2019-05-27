process.title = "SlimIO";

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
    console.time("start_core");
    const core = await (new Core(__dirname, {
        silent: argv.get("silent"),
        autoReload: argv.get("autoreload")
    })).initialize();
    console.timeEnd("start_core");
    console.log("SlimIO Agent started!");

    // Handle exit signal!
    process.on("SIGINT", () => {
        console.error("Exiting SlimIO Agent (please wait)");
        core.exit().then(() => {
            setImmediate(process.exit);
        }).catch(function mainErrorHandler(error) {
            console.error(error);
            process.exit(1);
        });
    });
}
main().catch(console.error);
