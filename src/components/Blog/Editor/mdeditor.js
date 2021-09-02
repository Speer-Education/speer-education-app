import Editor from 'rich-markdown-editor';
import styles from './mdeditor.css'
import { storage } from '../../../config/firebase';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ImageOutlined, PhotoAlbumTwoTone } from '@material-ui/icons';

const colors = {
  almostBlack: "#878787",
  lightBlack: "#2F3336",
  almostWhite: "#E6E6E6",
  white: "#FFF",
  white10: "rgba(255, 255, 255, 0.1)",
  black: "#000",
  black10: "rgba(0, 0, 0, 0.1)",
  primary: "#1AB6FF",
  greyLight: "#F4F7FA",
  grey: "#E8EBED",
  greyMid: "#C5CCD3",
  greyDark: "#DAE1E9",
};

const base = {
  ...colors,
  fontFamily: "'Inter', 'Roboto', arial, sans-serif",
  fontFamilyMono:
    "'SFMono-Regular',Consolas,'Liberation Mono', Menlo, Courier,monospace",
  fontWeight: 400,
  zIndex: 100,
  link: colors.primary,
  placeholder: "#B1BECC",
  textSecondary: "#4E5C6E",
  textLight: colors.white,
  textHighlight: "#b3e7ff",
  textHighlightForeground: colors.black,
  selected: colors.primary,
  codeComment: "#6a737d",
  codePunctuation: "#5e6687",
  codeNumber: "#d73a49",
  codeProperty: "#c08b30",
  codeTag: "#3d8fd1",
  codeString: "#032f62",
  codeSelector: "#6679cc",
  codeAttr: "#c76b29",
  codeEntity: "#22a2c9",
  codeKeyword: "#d73a49",
  codeFunction: "#6f42c1",
  codeStatement: "#22a2c9",
  codePlaceholder: "#3d8fd1",
  codeInserted: "#202746",
  codeImportant: "#c94922",

  blockToolbarBackground: colors.white,
  blockToolbarTrigger: colors.greyMid,
  blockToolbarTriggerIcon: colors.white,
  blockToolbarItem: colors.almostBlack,
  blockToolbarIcon: undefined,
  blockToolbarIconSelected: colors.black,
  blockToolbarText: colors.almostBlack,
  blockToolbarTextSelected: colors.black,
  blockToolbarHoverBackground: colors.greyLight,
  blockToolbarDivider: colors.greyMid,

  noticeInfoBackground: "#F5BE31",
  noticeInfoText: colors.almostBlack,
  noticeTipBackground: "#9E5CF7",
  noticeTipText: colors.white,
  noticeWarningBackground: "#FF5C80",
  noticeWarningText: colors.white,
};

const light = {
  ...base,
  background: colors.white,
  text: colors.almostBlack,
  code: colors.lightBlack,
  cursor: colors.black,
  divider: colors.greyMid,

  toolbarBackground: colors.lightBlack,
  toolbarHoverBackground: colors.black,
  toolbarInput: colors.white10,
  toolbarItem: colors.white,

  tableDivider: colors.greyMid,
  tableSelected: colors.primary,
  tableSelectedBackground: "#E5F7FF",

  quote: colors.greyDark,
  codeBackground: colors.greyLight,
  codeBorder: colors.grey,
  horizontalRule: colors.greyMid,
  imageErrorBackground: colors.greyLight,

  scrollbarBackground: colors.greyLight,
  scrollbarThumb: colors.greyMid,
};

const dark = {
  ...base,
  background: 'rgba(0, 0, 0, 0)',
  text: colors.almostWhite,
  code: colors.almostWhite,
  cursor: colors.white,
  divider: "#4E5C6E",
  placeholder: "#52657A",

  toolbarBackground: colors.white,
  toolbarHoverBackground: colors.greyMid,
  toolbarInput: colors.black10,
  toolbarItem: colors.lightBlack,

  tableDivider: colors.lightBlack,
  tableSelected: colors.primary,
  tableSelectedBackground: "#002333",

  quote: colors.greyDark,
  codeBackground: colors.black,
  codeBorder: colors.lightBlack,
  codeString: "#3d8fd1",
  horizontalRule: colors.lightBlack,
  imageErrorBackground: "rgba(0, 0, 0, 0.5)",

  scrollbarBackground: colors.black,
  scrollbarThumb: colors.lightBlack,
};

const YoutubeEmbed = ({ attrs }) => {
  const videoId = attrs.matches[1];
  return (
    <iframe
      className={styles.youtube_embed}
      title={`Youtube Embed ${videoId}`}
      src={`https://www.youtube.com/embed/${videoId}?modestbranding=1`}
    />
  );
}

const MDEditor = React.forwardRef(({ docId, className, readOnly, onChange, defaultValue, ...props }, ref) => {
  const [intReadOnly, setIntReadOnly] = useState(false);
  const [editorNewValue, setEditorNewValue] = useState("");
  const [currentValue, setCurrentValue] = useState("");

  useImperativeHandle(ref, () => ({
    handleExternalImageUpload,
    handleAddYoutubeVideo,
    readOnly: intReadOnly
  }),[intReadOnly, currentValue, setEditorNewValue, setIntReadOnly])

  useEffect(() => setIntReadOnly(readOnly), [readOnly])
  useEffect(() => {
    setCurrentValue(defaultValue || "")
  }, [defaultValue])


  const handleExternalImageUpload = async (file) => {
    if (!file) return;
    setIntReadOnly(true)
    const result = await storage.ref(`updates/${docId}/${`${docId}_${new Date().toISOString()}`}`).put(file);
    let url = await result.ref.getDownloadURL();
    const newValue = (currentValue || "") + `\n   ![](${url}) `
    setEditorNewValue(newValue)
    setCurrentValue(newValue)
    onChange(() => newValue)
    setIntReadOnly(false)
  }

  const handleAddYoutubeVideo = async (url) => {
    if (!url) return;
    setIntReadOnly(true)
    // const result = await storage.ref(`updates/${docId}/${`${docId}_${new Date().toISOString()}`}`).put(file);
    // let url = await result.ref.getDownloadURL();
    const newValue = (currentValue || "") + `\n   [${url}](${url}) `
    setEditorNewValue(newValue)
    setCurrentValue(newValue)
    onChange(() => newValue)
    setIntReadOnly(false)
  }

  return <>
    <div className="min-h-32">
      <Editor
        theme={light}
        className={`${className}`}
        defaultValue={defaultValue}
        value={editorNewValue}
        readOnly={intReadOnly}
        onChange={val => {
          onChange(val)
          setCurrentValue(val())
        }}
        uploadImage={async file => {
          const result = await storage.ref(`updates/${docId}/${`${docId}_${new Date().toISOString()}`}`).put(file);
          return await result.ref.getDownloadURL();
        }}
        embeds={[
          {
            title: "YouTube",
            keywords: "youtube video tube google",
            icon: () => (
              <img
                alt="Youtube Logo"
                src="https://upload.wikimedia.org/wikipedia/commons/7/75/YouTube_social_white_squircle_%282017%29.svg"
                width={24}
                height={24}
              />
            ),
            matcher: url => {
              return url.match(
                /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([a-zA-Z0-9_-]{11})$/i
              );
            },
            component: YoutubeEmbed,
          },
        ]}
        {...props}
      />
    </div>
  </>
})

export { MDEditor }