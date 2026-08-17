---

title: 'Getting a Distribution'
weight: 10

menu:
  main:
    identifier: "embedded-forms-ref-integration-download"
    parent: "embedded-forms-ref-integration"

---

# Manual Download

The Forms SDK's source is part of the EximeeBPMS engine repository, at
[webapps/frontend/eximeebpms-bpm-sdk-js](https://github.com/EximeeBPMS/eximeebpms/tree/main/webapps/frontend/eximeebpms-bpm-sdk-js)
in the open-source `eximeebpms` repository.


# Dependency Management

The Forms SDK depends on the following libraries:

* JQuery 3.7.1 (or a compatible DOM manipulation Library).

The Forms SDK *optionally* depends on the following libraries:

* AngularJS 1.8.3.


# Including the Library

The Forms SDK is distributed as source (a set of CommonJS modules, see `index-browser.js`) - there is no
prebuilt, minified bundle shipped with it. To use it in a page, bundle it yourself with a bundler such as
webpack or Browserify, the same way EximeeBPMS's own Cockpit/Tasklist/Admin webapps consume it internally.
