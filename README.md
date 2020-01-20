# T-Mobile Coding Challenge

### Task 4

```
Technical requirement: the server `stocks-api` should be used as a proxy
to make calls. Calls should be cached in memory to avoid querying for the
same data. If a query is not in cache we should call-through to the API.
```

_**Implement the solution and make a PR from the branch `feat_proxy_server` to `master`**_

> It is important to get the implementation working before trying to organize and clean it up.

_**Note: Added only the minimal changes to complete the technical requirement. Changes with `util` and test case fixes were done in Task 1**_

### Changes done

- Fixed the Google chart bug.
- Separated the server logic using Hapi plugin, used register method to register the plugins created for the `stock-api` project. This way it will be logically separated and makes it more maintainable and resuable plugins. Added the logic to register multiple plugins.
- Moved the environment constants `apiKey` and `apiURL` to `enviroment.ts` in `stocks-api`.
- Created the HTTP service with `axios` to call the external API.
- Used `catbox-memory` to implement the server-side caching mechanism. Also added an option to enable browser caching along with server-side.
- Created a price query http service class to implement the HTTP call to Hapi server. This way the HTTP client is moved out of effects.

### To Do

- The Hapi folder and it's related files can be moved to `libs` folder to follow the monorepo structure and makes it resuable.
