# T-Mobile Coding Challenge

### Task 3

```
Business requirement: As a user I want to choose custom dates
so that I can view the trends within a specific period of time.
```

_**Implement this feature and make a PR from the branch `feat_custom_dates` to `master`.**_

> Use the material date-picker component

> We need two date-pickers: "from" and "to". The date-pickers should not allow selection of dates after the current day. "to" cannot be before "from" (selecting an invalid range should make both dates the same value)

_**Note: Added only the minimal changes to complete the business requirement. Changes with `util` and test case fixes were done in Task 1**_

_Task 1 PR: https://github.com/ASreedh1/TMO-dev-puzzle/pull/1_

### Changes done

- Added the Angular material date picker and form validation error.
- Added logic to transform date range to periods available in API.
- Used `dataChange` event of `mat-datepicker` to reset date when date "to" before "from".
- Fixed the unit test case for Stock component.