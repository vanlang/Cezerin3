import { ContentState, convertToRaw, EditorState } from "draft-js"
import createAlignmentPlugin from "draft-js-alignment-plugin"
import createFocusPlugin from "draft-js-focus-plugin"
import createHashtagPlugin from "draft-js-hashtag-plugin"
import "draft-js-hashtag-plugin/lib/plugin.css"
import "draft-js-image-plugin/lib/plugin.css"
import createLinkifyPlugin from "draft-js-linkify-plugin"
import "draft-js-linkify-plugin/lib/plugin.css"
import Editor from "draft-js-plugins-editor"
import "draft-js/dist/Draft.css"
import draftToHtml from "draftjs-to-html"
import htmlToDraft from "html-to-draftjs"
import React, { useEffect, useState } from "react"

const focusPlugin = createFocusPlugin()
const alignmentPlugin = createAlignmentPlugin()
const hashtagPlugin = createHashtagPlugin()
const linkifyPlugin = createLinkifyPlugin()

const plugins = [focusPlugin, alignmentPlugin, linkifyPlugin, hashtagPlugin]

interface props {
  input: { value: string; onChange: Function }
}

const Draft = (props: props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  const { value, onChange } = props.input

  useEffect(() => {
    // to draft
    const blocksFromHtml = htmlToDraft(value)
    const { contentBlocks, entityMap } = blocksFromHtml
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    )
    setEditorState(EditorState.createWithContent(contentState))
  }, [])

  useEffect(() => {
    // save html
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const markup = draftToHtml(rawContentState)
    onChange(markup)
  }, [editorState])

  return (
    <Editor
      editorState={editorState}
      onChange={setEditorState}
      plugins={plugins}
    />
  )
}

export default Draft

//   inline: true,
//   plugins: [
//     "autolink lists link image charmap preview anchor",
//     "searchreplace visualblocks code fullscreen",
//     "media table paste code textcolor directionality",
//   ],
//   toolbar1:
//     "image media | styleselect | bold italic bullist numlist link alignleft aligncenter alignright alignjustify",
//   toolbar2:
//     "undo redo | forecolor paste removeformat table | outdent indent | preview code"

//         entityId={props.entityId}
//         config={{
//           relative_urls: false,
//           remove_script_host: false,
//           convert_urls: false,
//           language: settings.language,
//           themes: config.themes,
//           inline: config.inline,
//           plugins: config.plugins,
//           toolbar1: config.toolbar1,
//           toolbar2: config.toolbar2,
//           menubar: false,
