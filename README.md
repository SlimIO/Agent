# Agent
An agent is the result of the addition of a Core and several [Addons](https://github.com/SlimIO/Addon) called "**built in**". The presence of these addons is often mandatory (Each of them have a key role like managing the local database, managing alerting, metrics etc..).

<p align="center">
    <img src="https://i.imgur.com/ECZaYRY.png">
</p>

Main components of core:
- [SlimIO Core](https://github.com/SlimIO/Core)
- [SlimIO Arg-Parser](https://github.com/SlimIO/Arg-parser)

## Requirements
- [Node.js](https://nodejs.org/en/) v10 or higher
- [Git](https://git-scm.com/)

## Getting Started
To create a new agent, follow these steps (commands):

```bash
$ git clone https://github.com/SlimIO/Agent.git
$ cd Agent
$ npm ci
```

> Note: for a production installation, just run **npm install --production**

And then, run the agent with
```bash
$ npm start
```

It will generate all required files and directories.

> Note: By default Agent run with verbose activated, run **npm run silent** for non-verbose mode.

### Files and directories
This section describe all important files and directories.

| name | description |
| --- | --- |
| 📄 agent.json | local agent configuration |
| 📁 addons | where addons are (and must be) installed |
| 📁 debug | where core dump files are generated (**when an critical error occur in the Core**) |

> Agent.json is described by the following [JSON Schema](https://github.com/SlimIO/Core/blob/master/src/config/agent.schema.json).

### Install an addon

To install a addon ([Events](https://github.com/SlimIO/Events) for example), follow these steps:
```bash
$ cd addons
$ git clone https://github.com/SlimIO/Events.git events # <-- rename to events here!
$ cd events
$ npm install --production
```

Get back at the root of the project and edit `agent.json`
```json
{
    "addons": {
        "events": {
            "active": true,
            "standalone": false
        }
    }
}
```

Then, (re)start the agent **and events addon will be loaded** !

### Agent configuration
Agent.json contains a list of addons with their settings (These **are not mean to be used for the addon itself**). All parameters will allow the core to known how you want the addon to behave:

- Standalone (will it have a dedicated process or not?)
- Active (will it be started or not ?).

These settings will influence the way to communicate with inside the core too.

## CLI Options

- all commands start with `--`
- all shorcut start with `-`
```bash
node index --silent -a 1000
```

| name | shorcut | Default | description |
| --- | --- | --- | --- |
| silent | none | false | Enable silent mode |
| autoreload | `-a` | 500 | Configuration Autoreload delay |

## Dependencies

|Name|Refactoring|Security Risk|Usage|
|---|---|---|---|
|[@slimio/arg-parser](https://github.com/SlimIO/ArgParser#readme)|Minor|Medium|Command Line parser|
|[@slimio/core](https://github.com/SlimIO/Core#readme)|⚠️Major|High|SlimIO Core|

## License
MIT
