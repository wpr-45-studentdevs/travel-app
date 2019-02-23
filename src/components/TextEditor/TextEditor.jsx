import React, { Component } from 'react'
import ReactQuill from 'react-quill';
import axios from 'axios';

class TextEditor extends Component {
   constructor(props) {
      super(props);
      this.state = {
         text: "",
      }
   }

   saveNotes = async () => {
      const trip_id = this.props.trip_id;
      const { text } = this.state;
      let res = await axios.post('/api/notes', { trip_id, trip_notes: text })
      console.log(res.data)
   }

   modules = {
      toolbar: [
         [{ 'header': [1, 2, false] }],
         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
         [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
         ['link', 'image'],
         ['clean']
      ],
   };

   formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
   ];

   render() {
      return (
         <div className="text-editor">
            <ReactQuill theme="snow"
               modules={this.modules}
               formats={this.formats}
            >
            </ReactQuill>
         </div>
      );
   }
}

export default TextEditor;