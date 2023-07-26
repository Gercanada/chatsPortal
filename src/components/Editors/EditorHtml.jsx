import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const editorStyle = {
  border: '1px solid black',
  padding: '5px',
  borderRadius: '2px',
  height: '300px',
  width: '100%',
};

class EditorHtml extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });

    const { setHtml } = this.props;
    if (setHtml) {
      setHtml(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorStyle={editorStyle}
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          toolbarClassName='rdw-storybook-toolbar'
          wrapperClassName='rdw-storybook-wrapper'
          editorClassName='rdw-storybook-editor'
        />
        <textarea
          style={{ display: 'none' }}
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    );
  }
}

export default EditorHtml;
