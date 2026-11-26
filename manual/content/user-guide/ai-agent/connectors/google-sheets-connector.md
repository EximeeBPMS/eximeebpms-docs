---
title: 'Google Sheets Connector'
description: "Read, write and copy ranges of a Google spreadsheet from a process or as tools of an AI agent, with operator-set writable ranges, or with the spreadsheet and credentials in the element."
weight: 25
menu:
  main:
    identifier: 'ai-agent-google-sheets-connector'
    parent: 'ai-agent-connectors'
---

{{< note title="Enterprise Edition only" class="warning" >}}
The Google Sheets connector is an external task worker in Enterprise Connectors.
{{< /note >}}

The connector reads, writes or copies ranges of one Google spreadsheet per task
(topic `org.eximeebpms:google-sheets:1`, connector id `google-sheets`) and
writes the outcome to the local variable `sheetsResult`. What a task may touch
is set by the operator, not by the process model: each **client** names a
spreadsheet, its credentials, the process definitions allowed to use it and the
only ranges they may write. A write outside those ranges raises an incident
before Google is called, whatever the BPMN element or an AI agent asks for.

## Configure a client

```yaml
eximeebpms:
  connectors:
    googlesheets:
      clients:
        weekly:
          spreadsheet-id: 1AbCdEfGhIjKlMnOpQrStUvWxYz   # from the spreadsheet's URL
          process-definition-keys: [cashflowWeekly]
          writable-ranges:
            - "parametry!B5"
            - "parametry!D10:E11"
          authentication:
            type: user-account
            client-id: ${GOOGLE_CLIENT_ID}
            client-secret: ${GOOGLE_CLIENT_SECRET}
            refresh-token: ${GOOGLE_REFRESH_TOKEN}
```

The prefix is `googlesheets`, without a dash, so that environment variables
bind to client ids (`EXIMEEBPMS_CONNECTORS_GOOGLESHEETS_CLIENTS_WEEKLY_SPREADSHEETID`).

- **`process-definition-keys`** (at least one): a task of any other process
  definition fails with an incident, so a model of one process cannot use
  another process's client.
- **`writable-ranges`**: ranges in A1 notation with the sheet name. Leave it out
  for a read-only client.
- **`allow-formulas`** (default `false`): a written text that would start a
  formula (`=`, or `+`, `-`, `@` before anything but a number) is refused. A
  formula such as `IMAGE` or `IMPORTXML` could send the sheet's data to another
  server when the sheet is opened; allow formulas only when the process needs
  them.

### Credentials

Share the spreadsheet with the client's account as **editor**. Two kinds of
credentials are supported. A service account asks for the scope
`https://www.googleapis.com/auth/spreadsheets` only; a user account's access
tokens carry the scopes its refresh token was granted, so obtain that token
with this scope alone.

| `authentication.type` | Properties | Use |
| --- | --- | --- |
| `user-account` | `client-id`, `client-secret`, `refresh-token` | A Google account — a person's or a technical Workspace account — that granted an OAuth client access once; the connector exchanges the refresh token for access tokens |
| `service-account` | `service-account-key` | A Google Cloud service account: its JSON key as Google Cloud issues it; the connector signs a JWT with it (RFC 7523) |

For a user account, obtain the refresh token once, signed in as that account,
for an OAuth client of type "Web application" or "Desktop" with only the scope above
(for example through Google's OAuth 2.0 Playground with your own client). Google
revokes a refresh token that has not been used for six months, when the account
revokes the access, and after seven days while the OAuth consent screen is in
"Testing"; tasks then fail with an incident saying the client's credentials need
renewing. A service account needs a JSON key, which an organization policy may
forbid, and a spreadsheet shared with its `iam.gserviceaccount.com` address.

Keep credentials in the worker's environment or secret files; they never appear
in the process model. Apache HttpClient logs token requests and authorization
headers at DEBUG on `org.apache.hc.client5.http.wire` and `.headers`; the
connectors starter keeps these loggers at INFO unless you set them yourself —
leave them there. Requests to Google take the REST connector's network
policy, proxy and SSL bundle (`eximeebpms.connectors.http.*`): Google's public
addresses are allowed by default.

## Operations

| Input | Meaning |
| --- | --- |
| `clientId` | A configured client |
| `operation` | `readRange`, `writeRange` or `copyRows` |
| `range` | `readRange`, `writeRange`: A1 notation with the sheet name — `Sheet1!B5`, `Sheet1!A1:C3`, whole columns `Sheet1!A:C`, whole rows `Sheet1!5:10`, columns from a row down `Sheet1!A2:H`; quote other sheet names, `'My sheet'!A1` |
| `values` | `writeRange`: a list of rows, each a list of texts, numbers, booleans or `null` (leaves the cell as it is), or the same as JSON text; rows times the widest row at most 10 000 cells |
| `source` | `copyRows`: the rows to copy, `Sheet1!120:129`, or a rectangle |
| `destination` | `copyRows`: one cell, the top left corner of the paste (`Sheet1!A130`), or a range of the source's size |

Results in `sheetsResult`:

- `readRange`: `{range, values}` — unformatted values (numbers, not
  `1 553 225,71 zł`; dates as serial numbers); trailing empty cells are left
  out, an empty range gives `values: []`.
- `writeRange`: `{updatedRange, updatedRows, updatedColumns, updatedCells,
  previousValues}` — values are entered as if typed by a user, starting at the
  top left cell of `range`; `previousValues` records every cell of the written
  range as read just before the write, formulas as their text, an empty cell as
  `""`. It is a record, not a typed copy: a text `=1+1` reads like a formula and
  a text `00123` like a number, so writing `previousValues` back restores plain
  numbers and texts but may change such cells; a cell that held a formula can
  be written back only by a client with `allow-formulas`. Google's version
  history shows the changes with their cells; restoring a version there restores
  the whole spreadsheet, other people's later changes included, and Google may
  merge close versions.
- `copyRows`: `{source, destination}` — rows pasted with values, formulas and
  formats (also formulas of the copied cells: `allow-formulas` concerns only
  texts written with `writeRange`); `destination` is the range written. The
  destination must not overlap the source on the same sheet.

### How writes are limited

The connector checks the range Google would actually write: for `writeRange`
the top left cell of `range` extended by the rows and the widest row of
`values`; for `copyRows` the destination's top left cell extended by the
source's size. That range must lie within the client's writable ranges of the
same sheet; several ranges may cover it together (`C34:C43` and `D34:D43` allow
`C34:D43`). A ten-row copy whose first target row is allowed but whose last is
not is refused. A destination larger than the source is refused too, as Google
would repeat the source over it.

No input resolves `{{secrets.NAME}}` placeholders: a cell value holding such a
text — which an AI agent might have written — reaches the sheet as text.

## Use it as an agent tool

Three templates expose one operation each to an
[AI agent]({{< ref "/user-guide/ai-agent/ai-agent.md" >}}): **Google Sheets read
as agent tool** (`range` from the model), **write** (`range` and `values`) and
**copy rows** (`source`, `destination`). The operation and `clientId` are fixed
by the modeller; the model fills only the fields that use `fromAi(...)`. Map
`toolCallResult` from `${sheetsResult}` (the templates do). Describe each tool in
the element's documentation, including which cells it is meant for: the
writable ranges are the hard limit, the description guides the model.

## Errors and retries

`429`, `408`, `5xx` and failed connections are retried (`retries`,
`retryBackoff`, defaults three attempts and ten seconds). An incident is raised
for refused credentials (a revoked refresh token, a deleted key), an account
without access to the spreadsheet (`403`), a missing spreadsheet or sheet
(`404`), another `4xx`, a write outside the writable ranges, a process
definition the client is not bound to, a formula, and invalid inputs. Messages
name the element, the client, the status and Google's error code, never cell
values.

Writing the same values twice writes the same cells, so a write repeated after
a lost completion is harmless; a repeated copy pastes the source as it is at
that moment. An answer that is not the Sheets API's JSON (a proxy's page) is
retried, never taken for data or a confirmed write. The connector keeps no log of its writes: the
spreadsheet's version history in Google shows the changes with the account
that made them; give each client its own account to tell its writes apart.
Google may merge revisions made close together, so two writes of one cell in
quick succession can show as one change.

## Spreadsheet and credentials in the element (remote connector)

The **Google Sheets Remote Connector** (topic
`org.eximeebpms:google-sheets-remote:1`, connector id `google-sheets-remote`)
takes the spreadsheet and the credentials from the BPMN element, and there is
no client configuration.

| Input | Meaning |
| --- | --- |
| `spreadsheetId` | The spreadsheet's id, from its URL |
| `authentication.type` | `userAccount` (`clientId`, `clientSecret`, `refreshToken`), `serviceAccount` (`serviceAccountKey`, the JSON key) or `bearer` (`token`, an access token obtained elsewhere — it expires within an hour and is never renewed) |
| `allowFormulas` | `false` by default; `true` lets written texts start formulas |
| `operation`, `range`, `values`, `source`, `destination` | As above |

Put credentials in `{{secrets.NAME}}` placeholders: only `authentication` is
searched for them, so a cell value is still written as it is.

{{< note title="No write limit" class="warning" >}}
The remote connector has no writable ranges and no process definition binding:
an element writes wherever its account may. Use it for fixed process steps; for
tools whose ranges an AI agent chooses, use the client-configured connector.
{{< /note >}}

Results, the range forms, the copy rules, errors and retries are the same as
above. The worker's network policy, proxy and SSL bundle
(`eximeebpms.connectors.http.*`) and the `timeout`, `max-response-size`,
`api-url` and `token-endpoint` of `eximeebpms.connectors.googlesheets` apply;
its `clients` are not used. An element can name any secret the worker knows,
so keep the credentials of a client-configured connector out of
`eximeebpms.connectors.secrets.*` (reference them with `${...}` as shown
above), or a remote element could use them without the writable ranges.
Switch the remote connector off with
`eximeebpms.connectors.connector.google-sheets-remote.enabled=false`.
