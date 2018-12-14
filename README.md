# Agent
An Agent is the result of the addition of a Core and several Addons called "built in". The presence of these addons is often mandatory for the proper functioning of the Agent.

<p align="center">
    <img src="https://i.imgur.com/ECZaYRY.png">
</p>

- [SlimIO Core](https://github.com/SlimIO/Core)
- [SlimIO Addon](https://github.com/SlimIO/Addon)

## Getting Started
To create a new agent, follow these steps (commands):

```bash
$ git clone https://github.com/SlimIO/Agent.git
$ cd Agent
$ npm install
```

And then, run the agent with
```bash
$ npm start
```

It will generate all default files and directories required.

## Files and directories

| name | type | description |
| --- | --- | --- |
| agent.json | file | local agent configuration |
| addons | directory | where addons should be installed |
| debug | directory | where core dump files are generated |

## Install an addon

To install a new addon (take Events for example), follow these steps:
```bash
$ cd addons
$ git clone https://github.com/SlimIO/Events.git events
$ cd events
$ npm install
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

Then, (re)start the agent and events will be loaded !

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
