---

title: 'AngularJS Integration'
weight: 30

menu:
  main:
    identifier: "embedded-forms-ref-integration-angularjs"
    parent: "embedded-forms-ref-integration"

---


# Including the Angular Distribution

Make sure your bundle includes the AngularJS build of the Forms SDK (`lib/angularjs/forms`, see
[Getting a Distribution]({{< ref "/reference/forms/embedded-forms/integrate/getting-a-distribution.md" >}})) alongside AngularJS itself.


# Loading the Forms Module

Add the Forms SDK as module dependency to your application
module:

```javascript
angular.bootstrap(window.document, ['cam.embedded.forms', ...]);
```


# Angular Directives & Compilation

If the form is loaded from a URL, the SDK makes sure that it is properly compiled and linked to the current Angular scope. This allows using Angular directives in forms loaded dynamically at runtime.

```html
<form role="form" name="form">

<input type="text"
       cam-variable-name="CUSTOMER_ID"
       cam-variable-type="String"
       ng-model="customerId">

<p ng-show="customerId">Your input: <em>{{customerId}}</em></p>

</form>
```
