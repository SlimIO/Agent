/// <reference types="@slimio/arg-parser" />

declare namespace Agent {
    interface Argv {
        silent: boolean;
        autoreload: number;
    }
}

export = Agent;
export as namespace Agent;
