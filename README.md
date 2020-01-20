# T-Mobile Coding Challenge

### Task 2

```
Business requirement: As a user I should be able to type into
the symbol field and make a valid time-frame selection so that
the graph is refreshed automatically without needing to click a button.
```

_**Make a PR from the branch `feat_stock_typeahead` to `master` and provide a code review on this PR**_

> Add comments to the PR. Focus on all items that you can see - this is a hypothetical example but let's treat it as a critical application. Then present these changes as another commit on the PR.

_**Note: For this task, only the minimal changes to complete the business requirement are done. The util changes are not considered in this task since it was already done / showcased in Task 1.**_

_Task 1 PR: https://github.com/ASreedh1/TMO-dev-puzzle/pull/1_

## Changes done

- Used the Reactive form `valueChanges` method to listen for form changes.
- Added unsubscription code using the `takeUntil` operator in `RxJS`.
- Fixed the bug to show the chart.
- Fixed all the test cases.
