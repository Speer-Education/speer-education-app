import { storage } from '../../../config/firebase';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill, ReactQuillProps } from 'react-quill';
import { Delta as TypeDelta, DeltaStatic, Sources } from "quill";
import MarkdownShortcuts from 'quill-markdown-shortcuts/dist/markdownShortcuts';
import ImageUploader from "quill-image-uploader";
import { ImageDrop } from 'quill-image-drop-module';
import BlotFormatter from 'quill-blot-formatter';
import ImageSpec from 'quill-blot-formatter/dist/specs/ImageSpec';
import "quill-mention";
import { usersIndex } from '../../../config/algolia';
import 'react-quill/dist/quill.snow.css';
import './mdeditor.css'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useMediaQuery } from 'react-responsive';


Quill.register('modules/blotFormatter', BlotFormatter);
Quill.register('modules/markdownShortcuts', MarkdownShortcuts);
Quill.register("modules/imageUploader", ImageUploader);
Quill.register('modules/imageDrop', ImageDrop);

type Props = {
  docId: string,
  className?: string,
  readOnly?: boolean,
  onChange: (value: string, delta: DeltaStatic, source: Sources, editor: ReactQuill.UnprivilegedEditor) => void,
  defaultValue?: TypeDelta,
} & ReactQuillProps

class CustomQuill extends ReactQuill {
  destroyEditor() {
    if (!this.editor) return;
    this.unhookEditor(this.editor);
  }

  instantiateEditor() {
    if(this.editor) {
      this.hookEditor(this.editor);
    }
    super.instantiateEditor();
  }
}


export const MDEditor = forwardRef<ReactQuill | null, Props>(({
  docId,
  className,
  defaultValue,
  readOnly = false,
  onChange,
  ...props
}, editor) => {
  const _editor = useRef<ReactQuill>(null);
  const mobile = useMediaQuery({ maxWidth: 767 });
  useImperativeHandle<ReactQuill | null, ReactQuill | null>(editor, () => _editor.current, [_editor.current]);

  function videoHandler() {
    let url = prompt("Enter Video URL: ");
    url = getVideoUrl(url);
    let range = _editor.current?.getEditorSelection();
    if (url != null && !!range) {
      _editor.current?.getEditor().insertEmbed(range.index, 'video', url);
    }
}

  function getVideoUrl(url) {
      let match = url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) ||
          url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/) ||
          url.match(/^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/);
      if (match && match[2].length === 11) {
          return ('https') + '://www.youtube.com/embed/' + match[2] + '?showinfo=0';
      }
      if (match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) { // eslint-disable-line no-cond-assign
          return (match[1] || 'https') + '://player.vimeo.com/video/' + match[2] + '/';
      }
      return null;
  }

  const modules = useMemo(() => ({
    toolbar: {
      container: mobile?
        [["bold","link","image",{"header":1},{"header":2},{"list":"ordered"},{"list":"bullet"}]]: 
        [["bold","italic","underline","strike"],["link","image","video"],[{"header":1},{"header":2}],[{"list":"ordered"},{"list":"bullet"},{"list":"check"}],["clean"]],
      handler: {
        'video': videoHandler
      }
    },
    markdownShortcuts: {},
    imageUploader: {
      upload: async (file) => {
        const result = await uploadBytes(ref(storage, `updates/${docId}/${`${docId}_${new Date().toISOString()}`}`),file);
        return await getDownloadURL(result.ref);

      }
    },
    imageDrop: true,
    blotFormatter: {
      spec: [
        ImageSpec
      ],
      overlay: {
        style: {border: '2px solid rgb(0,153,255)'}
      }
    },
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      mentionContainerClass: '',
      source: function(searchTerm: string, renderList, mentionChar) {
        if(mentionChar == '@') {
          usersIndex.search<{name: string}>(searchTerm, {
            hitsPerPage: 10
            }).then(function(content) {
              renderList(content.hits.map(e => ({id:e.objectID, value: e.name})), mentionChar);
            }
          );
        } else if(mentionChar == '#') {
          const _lowercase = searchTerm.trim().toLowerCase();
          if(_lowercase == '') renderList([], mentionChar);
          else renderList([{ id:1, value:_lowercase }], mentionChar);
        }
      }
    }
  }), [mobile]);

  return <CustomQuill
    ref={_editor}
    theme="snow"
    className="w-full prose lg:prose-xl max-w-none"
    placeholder="Write down a post~"
    modules={modules}
    readOnly={readOnly}
    defaultValue={defaultValue}
    onChange={onChange}
    {...props}
  />
})