process.title = "SlimIO";
const Core = require("@slimio/core");

/**
 * @async
 * @function main
 * @returns {Promise<void>}
 */
async function main() {
    console.time("start_core");
    const core = await (new Core(__dirname)).initialize();
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
