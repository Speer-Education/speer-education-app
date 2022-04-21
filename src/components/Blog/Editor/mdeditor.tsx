// import Editor from 'rich-markdown-editor';
// import styles from './mdeditor.css'
import { storage } from '../../../config/firebase';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { Delta as TypeDelta, DeltaStatic, Sources } from "quill";
import 'react-quill/dist/quill.bubble.css';

// const YoutubeEmbed = ({ attrs }) => {
//   const videoId = attrs.matches[1];
//   return (
//     <iframe
//       className={styles.youtube_embed}
//       title={`Youtube Embed ${videoId}`}
//       src={`https://www.youtube.com/embed/${videoId}?modestbranding=1`}
//     />
//   );
// }

// const MDEditor = React.forwardRef(({ docId, className, readOnly, onChange = () => {}, defaultValue, ...props }, ref) => {
//   const [intReadOnly, setIntReadOnly] = useState(false);
//   const [editorNewValue, setEditorNewValue] = useState("");
//   const [currentValue, setCurrentValue] = useState("");
//   const editorRef = useRef();

//   useImperativeHandle(ref, () => ({
//     handleExternalImageUpload,
//     handleAddYoutubeVideo,
//     readOnly: intReadOnly,
//     ...editorRef.current
    
//   }),[intReadOnly, currentValue, setEditorNewValue, setIntReadOnly])

//   useEffect(() => setIntReadOnly(readOnly), [readOnly])
//   useEffect(() => {
//     setCurrentValue(defaultValue || "")
//   }, [defaultValue])


//   const handleExternalImageUpload = async (file) => {
//     if (!file) return;
//     setIntReadOnly(true)
//     const result = await storage.ref(`updates/${docId}/${`${docId}_${new Date().toISOString()}`}`).put(file);
//     let url = await result.ref.getDownloadURL();
//     const newValue = (currentValue || "") + `\n   ![](${url}) `
//     setEditorNewValue(newValue)
//     setCurrentValue(newValue)
//     onChange(() => newValue)
//     setIntReadOnly(false)
//   }

//   const handleAddYoutubeVideo = async (url) => {
//     if (!url) return;
//     setIntReadOnly(true)
//     // const result = await storage.ref(`updates/${docId}/${`${docId}_${new Date().toISOString()}`}`).put(file);
//     // let url = await result.ref.getDownloadURL();
//     const newValue = (currentValue || "") + `\n   [${url}](${url}) `
//     setEditorNewValue(newValue)
//     setCurrentValue(newValue)
//     onChange(() => newValue)
//     setIntReadOnly(false)
//   }

//   return <>
//     <div style={{wordBreak: "break-word" }}>
//       <Editor
//         ref={editorRef}
//         theme={light}
//         className={`${className}`}
//         defaultValue={defaultValue}
//         value={editorNewValue}
//         readOnly={intReadOnly}
//         onChange={val => {
//           onChange(val)
//           setCurrentValue(val())
//         }}
//         uploadImage={async file => {
//           const result = await storage.ref(`updates/${docId}/${`${docId}_${new Date().toISOString()}`}`).put(file);
//           return await result.ref.getDownloadURL();
//         }}
//         embeds={[
//           {
//             title: "YouTube",
//             keywords: "youtube video tube google",
//             icon: () => (
//               <img
//                 alt="Youtube Logo"
//                 src="https://upload.wikimedia.org/wikipedia/commons/7/75/YouTube_social_white_squircle_%282017%29.svg"
//                 width={24}
//                 height={24}
//               />
//             ),
//             matcher: url => {
//               return url.match(
//                 /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([a-zA-Z0-9_-]{11})$/i
//               );
//             },
//             component: YoutubeEmbed,
//           },
//         ]}
//         {...props}
//       />
//     </div>
//   </>;
// })

// export { MDEditor }

export const MDEditor = forwardRef<ReactQuill, {
  docId: string,
  className?: string,
  readOnly?: boolean,
  onChange: (value: string, delta: DeltaStatic, source: Sources, editor: ReactQuill.UnprivilegedEditor) => void,
  defaultValue?: TypeDelta,
}>(({ 
  docId, 
  className, 
  readOnly = false, 
  onChange = () => {}, 
  defaultValue, 
  ...props 
}, editor) => {
  return <ReactQuill 
    ref={editor}
    theme="bubble" 
    defaultValue={defaultValue} 
    onChange={onChange} 
    className="w-full prose lg:prose-xl"
    readOnly={readOnly}
    placeholder="Write down a post~"/>
})