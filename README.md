# T-Mobile Coding Challenge

### Task 1

Please provide a short code review of the base `master` branch:

1. What is done well?

- Application uses **Nrwl** Nx tool, which is used for monorepos and therefore there will be only a single workspace for all the projects including the frontend and the backend.

- `app` folder contains different projects which can follow any frontend framework and use the shared components within different projects. `libs` folder allows to sharing code between frontend and backend.

- Application uses the **ngRx** for state management and it follows facade design pattern.

- Using facade pattern, it will create an abstraction to the state and gives simpler interface to UI components and uses indirection flow.

- Application follows modularity which enables the reusability and used the lazy-loading of the modules.

2. What would you change?

- **[Done]** In `ChartComponent` data can be received as `@Input any` instead of Observables and so that can the subscribe code can be removed in the ngOnInit() method. This way we can use `async` pipe to subscribe from the template.

- **[Done]** `ChangeDetectionStrategy.OnPush` will be used in the Chart component so that it depends only on the `@Input` so that it will increase the performance and component code will not get executed on every changes.

- **[Done]** Chart options is hard-coded in the `ChartComponent`, `@Input` property as optional can be used to override the default option.

- **[Done]** The `loadChildren` can use browser built-in `import` syntax to dynamic import the module. For this we need to modify `tsconfig.json` with

```
  "target": "es2015",
  "module": "esnext"
```

```

  loadChildren: () =>
    import('@coding-challenge/stocks/feature-shell').then(
      m => m.StocksFeatureShellModule
    )

```

- **[Done]** A separate `util` folder can be used to have the constants and functions that are used in the `ui` or `feature-shell` and thus will increase the reusability and consistency. To showcase the `util` folder and `nx` commands, have generated using the command `ng generate @nrwl/schematics:library` and used in a minimal way. There are other commands which will leverage the use of application development and can control the structure.

- **[Not Done]** `Hapi` server and it's route is created in a single file. This can be done using hapi plugin so that each can have different routes and can be registered in the server which will separate the logic and increase the reusability. This will be handled as part of **Task 4**.

- **[Done]** API error can be retrieved from the state and shown in the form.

- **[Done]** Added symbol to the state.

3. Are there any code smells or problematic implementations?

- **[Fixed]** Google chart is not shown.
- **[Fixed]** There are no `unsubscribe()` used for the subscriptions done.
- **[Fixed]** All the test cases are failing.
- **[Fixed]** Form error not added for input period.
- **[Fixed]** API error not shown in the form.
