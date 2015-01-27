## React Form For Object

No-effort, simple ReactJS form builder for Javascript objects.

Simply pass FormFor a javascript object and it will display the form and handle
data for you. You can always override defaults by passing FormFor options.

There is a full working example [here](./example)

### Install
```bash
bower install react-form-for-object
```

### Usage
FormFor will determine the type of input based on the your object. We do our best
to detect the type of the input you're looking for. However, some things are harder to detect such as textarea. We give you the option to override them in the options by passing a type (see example below).

Supply a submit handler with onSubmit key in the options. On submit, FormFor will pass all of the form data to the callback you provided.

Supply a cancel handler with onCancel key in the options. If you don't want a cancel button,
simply don't supply an onCancel handler.

FormFor will display all errors supplied to it in the errors prop.

If we can't successfully detect the type of value from an object attribute, we default
to text input.

By default, id attributes are built as hidden input.

```javascript
var todo = {
  name: "Clean my room",
  description: "My room needs some serious cleaning",
  completed: false,
  list: "Home"
}
var formOptions: {
  labels: true, // by default we use placeholders, but you can turn on labels and we will use both.
  onSubmit: function(data, utils) {console.log(data)},
  onCancel: function(data) { //do something like change state to editing false }
  description: { type: 'textarea' },
  list: { type: 'select', values: [{value:"Home", show: "Home"}, {value:"Work", show: "Work"}] }
}

<FormFor object={todo} options={formOptions} errors={[]} />

```
#### How to use the options
Each attribute on your object can have its own options/overrides. In your option object,
use the name of the attribute as the key (see example above). Currently you can supply the following options:

- type: 'textarea', 'select' (please see supported inputs below). Please keep in mind that you don't have to supply any options for FormFor to work, only supply them to override what we give you
based on your object attributes.
- className
- value
- onSubmit
- onCancel
- labels: turned off by default.
- placeholder: we use the name of the field, you can override that (this also affects label, if labels are turned on).

### Labels
You can pass a labels: true attribute in the form options. We will then

### Input support

- text
- checkbox
- number
- hidden
- select
- password
- textarea
- date
- datetime
- email
- submit
- color

### Utilities
When we call your submitHandler, we pass it a utils object that will have
some useful functions that you could use. Currently, we support the following
utility functions:
- clearInputs: use this to clear all input fields after success.

## Examples
A working example can be found [here](./example)

## TODO
- file
- image
- month
- radio
- range
- reset
- search
- tel
- url
- week
