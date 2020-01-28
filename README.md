# Agent

![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/SlimIO/Agent/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/Agent/commit-activity)
[![mit](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/SlimIO/Agent/blob/master/LICENSE)
![dep](https://img.shields.io/david/SlimIO/Agent)
![size](https://img.shields.io/github/languages/code-size/SlimIO/Agent)
![known vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/SlimIO/Agent)
[![Build Status](https://travis-ci.com/SlimIO/Agent.svg?branch=master)](https://travis-ci.com/SlimIO/Agent)

An agent is the result of the addition of a [Core](https://github.com/SlimIO/Core) and several [Addons](https://github.com/SlimIO/Addon) called "**built in**". The presence of these addons is often mandatory (Each of them have a key role like managing the local database, managing alerting, metrics etc..). These behaviors are more described in the SlimIO specification if you are interested.

<p align="center">
    <img src="https://i.imgur.com/FS7lRQU.png">
</p>

Main components of Agent:
- [SlimIO Core](https://github.com/SlimIO/Core) (The core itself...).
- [SlimIO Arg-Parser](https://github.com/SlimIO/Arg-parser) (The package we use to parse process.argv).

> 👀 Dont hesitate to follow these links to dig deeper.

## Requirements
- [Node.js](https://nodejs.org/en/) v12 or higher
- [Git](https://git-scm.com/)

## Getting Started
To create a new agent, follow these steps (commands):

```bash
$ git clone https://github.com/SlimIO/Agent.git
$ cd Agent
$ npm ci
```

> 💡 for a production installation, just run **npm install --production**

And then, run the agent with
```bash
$ npm start
# or without npm (just with the node.exe binary)
$ node index.js
```

It will generate all required files and directories.

> 👀 By default Agent run with verbose activated, use the command **npm run silent** to run without verbose mode.

### Files and directories
This section describe all important files and directories.

| name | description |
| --- | --- |
| 📄 agent.json | local agent configuration. This file is not required to start an agent, it will be dynamically filled the first time! |
| 📁 addons | where addons are (and must be) installed. |
| 📁 debug | where core dump files are generated (**when an critical error occur in the Core**) |

These files and directories are automatically created and managed when they dont exist. So do not bother yourself with that kind of stuff...

> 👀 agent.json is described by the following [JSON Schema](https://github.com/SlimIO/Core/blob/master/src/config/agent.schema.json).

### Manually install an addon

To install a addon ([Events](https://github.com/SlimIO/Events) for example), follow these steps:
```bash
$ cd addons
$ git clone https://github.com/SlimIO/Events.git events # <-- rename to events here!
$ cd events
$ npm install --production # dont forgot to install the Node.js dependencies of that addon...
```

Get back at the root of the project and edit `agent.json` to add your addon. If there is no configuration yet, think to create the root structure with the `addons` key.
```json
{
    "addons": {
        "events": { // <-- add your addon
            "active": true,
            "standalone": false
        }
    }
}
```

Then, (re)start the agent **and events addon will be loaded** ! (Note: the SlimIO CLI have a reload option under configuration command).

### Agent configuration
Agent.json contains a list of addons with their settings (These **are not mean to be used for the addon itself**). All parameters will allow the core to known how you want the addon to behave:

- Standalone (will it have a dedicated process or not?)
- Active (will it be started or not ?).

These settings will influence the way to communicate with it inside the core too.

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
|[@slimio/arg-parser](https://github.com/SlimIO/ArgParser#readme)|Minor|Low|The package we use to parse our script argument (process.argv)|
|[@slimio/core](https://github.com/SlimIO/Core#readme)|⚠️Major|Low|SlimIO Core|

## License
MIT
