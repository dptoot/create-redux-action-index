# redux-create-action-index
CLI utility to creates or update a index.js file in supplied target directories.  The generated index file will import all sibling redux action files and export a single redux action object.

### Installation
```js
npm install --save-dev redux-create-action-index
```

### Usage
```js
redux-create-action-index ./src/actions
```

### Example
Given the following directory structure:

```sh
> tree ./src/actions
./
├── file1.js
├── file2.js
├── file3.js
├── file4.js
└── file5.js

0 directories, 5 files
```

Running ```js redux-create-action-index ./src/actions``` will generate an ```index.js``` file in ```./src/actions``` containing:

```js
import * as file1Actions from './file1.js';
import * as file2Actions from './file2.js';
import * as file3Actions from './file3.js';
import * as file4Actions from './file4.js';
import * as file5Actions from './file5.js';

export default Object.assign({}, 
    file1Actions,
    file2Actions,
    file3Actions,
    file4Actions,
    file5Actions
);
``` 

These ActionCreators can now be accessed in any component using redux's connect via:

```js
import {connect} from 'react-redux';
import ActionCreators from '../actions';

...

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

...

export default connect(mapStateToProps, mapDispatchToProps)(Component);
```

### CLI Options
```sh
  --indent, -i  set number of spaces to indent             [number] [default: 4]
  --suffix, -s  suffix to add to the import module name    [string] [default: "Actions"]
  --help        Show help                                  [boolean]
```