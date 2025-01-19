import React, { useState } from 'react';
import WysiwygEditor from './components/WysiwygEditor';
import staticTexts from './Locales/staticTexts.json';
import './styles.css'; 


const App: React.FC = () => {
  const [editorContent, setEditorContent] = useState<string | undefined>();

  return (
    <div className='App'>
      <h2 className='header-title'>{staticTexts?.app?.controlledMode}</h2>
      <WysiwygEditor value={editorContent} onChange={setEditorContent} />

      <h2 className='header-title'>{staticTexts?.app?.uncontrolledMode}</h2> 
      <WysiwygEditor />
    </div>
  );
};

export default App;
