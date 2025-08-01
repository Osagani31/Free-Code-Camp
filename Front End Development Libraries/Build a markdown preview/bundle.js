
import React, { useState, useEffect } from "https://esm.sh/react";
import { marked } from "https://esm.sh/marked";
import './App.css';

const App = () => {
  const defaultMarkdown = `# Heading (H1)
## Subheading (H2)

[Link to freeCodeCamp](https://www.freecodecamp.org)

\`inline code\`

\`\`\`
// code block
function example() {
  return 'Hello World!';
}
\`\`\`

- List item 1
- List item 2
- List item 3

> Blockquote

**Bolded text**

![freeCodeCamp Logo](https://design-style-guide.freecodecamp.org/downloads/fcc_secondary_small.svg)
`;

  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [htmlPreview, setHtmlPreview] = useState('');

  useEffect(() => {
    // Set initial preview
    updatePreview(markdown);
  }, []);

  const updatePreview = (text) => {
    // Use marked to convert markdown to HTML
    const html = marked.parse(text, { breaks: true });
    setHtmlPreview(html);
  };

  const handleChange = (e) => {
    const newMarkdown = e.target.value;
    setMarkdown(newMarkdown);
    updatePreview(newMarkdown);
  };

  return (
    <div className="app">
      <div className="editor-container">
        <h2>Editor</h2>
        <textarea
          id="editor"
          value={markdown}
          onChange={handleChange}
          className="editor"
        />
      </div>
      <div className="preview-container">
        <h2>Preview</h2>
        <div
          id="preview"
          dangerouslySetInnerHTML={{ __html: htmlPreview }}
          className="preview"
        />
      </div>
    </div>
  );
};

export default App;