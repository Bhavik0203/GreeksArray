import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';

const CodeSnippetEditor = () => {
  const [code, setCode] = useState('');
  const [snippetType, setSnippetType] = useState('javascript');

  const handleSnippetTypeChange = (e) => {
    setSnippetType(e.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '500px', margin: 'auto' }}>
      {/* <select value={snippetType} onChange={handleSnippetTypeChange} style={{ marginBottom: '10px' }}>
        <option value="javascript">JavaScript</option>
        <option value="xml">HTML/XML</option>
        <option value="css">CSS</option>
      </select>
      <CodeMirror
        value={code}
        options={{
          mode: snippetType,
          theme: 'dracula',
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
        style={{ height: '200px' }}
      /> */}
    </div>
  );
};

export default CodeSnippetEditor;
