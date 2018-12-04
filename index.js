require("v8-compile-cache");

process.title = "SlimIO";
const Core = require("@slimio/core");
const ArgParser = require("@slimio/arg-parser");

// Retrieve argv
const argv = new ArgParser("v0.1.0", "SlimIO Agent CLI")
    .addCommand("--silent", "Enable silent mode")
    .addCommand("-a --autoreload [number=500]", "Configuration Autoreload delay")
    .parse();

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
