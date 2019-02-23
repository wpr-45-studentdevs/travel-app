import React, { Component } from 'react'
import ReactQuill from 'react-quill';
import './TextEditor.scss';

class TextEditor extends Component {
   constructor(props) {
      super(props);
      this.state = {}
   }

   componentDidMount = async () => {
      await this.props.getNotes();
   }


   modules = {
      toolbar: [
         [{ 'size': ['small', false, 'large', 'huge'] }],
         ['bold', 'italic', 'underline', 'strike' ],
         [{ 'color': [] }, { 'background': [] }],
         [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],
         ['link'],
         ['clean'],
      ],
   };

   formats = [
      'size', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'indent', 'link', 'color', 'background', 'align', 'clean',
   ];

   render() {
      return (
         <>
            <ReactQuill
               value={this.props.text}
               onChange={this.props.handleNotesChange}
               modules={this.modules}
               formats={this.formats}
               placeholder={'Trip notes...'}
            />
         </>
      )
   }
}

export default TextEditor;