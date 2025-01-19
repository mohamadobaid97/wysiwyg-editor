# WYSIWYG Editor Component in React
This is a reusable and flexible WYSIWYG Editor Component built in React, using the draft-js library. The component supports both controlled and uncontrolled modes, with a basic toolbar that provides text formatting options like Bold, Italic, and Underline. It is built with modern React best practices, functional components, and React hooks.


## Features
* Controlled and Uncontrolled Modes:

* The component can be used in controlled mode when both value and onChange props are provided.
It can also operate in uncontrolled mode when no value prop is passed, managing its internal state.
Text Formatting:

* Supports text formatting options such as Bold, Italic, and Underline.
Customizable Toolbar:

* The toolbar can be customized using the renderToolbar prop.
Async Content Simulation:

* Simulates async behavior to fill the editor with content (e.g., fetched from an API).
Styling Customization:

* Basic styling customization using the className and style props.

## Installation
### To get started, clone this repository to your local machine:
```Shell 
git clone https://github.com/mohamadobaid97/wysiwyg-editor.git
```


### Navigate to the project directory:
```Shell 
cd wysiwyg-editor
```

### Install the dependencies:
```Shell 
npm install
```


## Usage
You can use this component in controlled or uncontrolled mode.

### Controlled Mode
In controlled mode, the editor state is managed externally, using value and onChange props.
```ts 
import React, { useState } from 'react';
import WysiwygEditor from './components/WysiwygEditor';

const App: React.FC = () => {
  const [editorContent, setEditorContent] = useState<string | undefined>();

  return (
    <div className='App'>
      <h2>Controlled Mode</h2>
      <WysiwygEditor value={editorContent} onChange={setEditorContent} />
    </div>
  );
};

export default App;

```

### Uncontrolled Mode
In uncontrolled mode, the editor manages its own internal state. You don't need to pass the value and onChange props.

```ts 
import React from 'react';
import WysiwygEditor from './components/WysiwygEditor';

const App: React.FC = () => {
  return (
    <div className='App'>
      <h2>Uncontrolled Mode</h2>
      <WysiwygEditor />
    </div>
  );
};

export default App;
```
## Toolbar Customization
You can customize the toolbar by passing a renderToolbar prop to the WysiwygEditor component. The renderToolbar prop should be a function that receives formatting action handlers (e.g., onBold, onItalic, onUnderline) and returns JSX for the toolbar.
```ts 
import React from 'react';
import WysiwygEditor from './components/WysiwygEditor';

const CustomToolbar: React.FC = ({ onBold, onItalic, onUnderline }) => {
  return (
    <div className="custom-toolbar">
      <button onClick={onBold}>Bold</button>
      <button onClick={onItalic}>Italic</button>
      <button onClick={onUnderline}>Underline</button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <h2>Custom Toolbar</h2>
      <WysiwygEditor renderToolbar={CustomToolbar} />
    </div>
  );
};

export default App;


```

## Testing
Unit tests have been written to verify the functionality of each toolbar action (e.g., bold, italic, underline). You can run the tests using the following command:

```Shell 
npm test
```

## Development
To start the development server and see the editor in action:
```Shell 
npm start
```
