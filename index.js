const Core = require("@slimio/core");

/**
 * @async
 * @function main
 * @returns {Promise<void>}
 */
async function main() {
    const core = new Core(__dirname);
    await core.initialize();
    console.log("SlimIO Agent started!");

    // Handle exit signal!
    process.on("SIGINT", async() => {
        console.log("(SIGINT Catched) - Exiting SlimIO Agent properly (...please wait)");
        try {
            await core.exit();
            setImmediate(process.exit);
        }
        catch (error) {
            console.error(error);
            process.exit(1);
        }
    });
}
main().catch(console.error);
