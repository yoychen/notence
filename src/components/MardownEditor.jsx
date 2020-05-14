/* eslint-disable import/no-extraneous-dependencies */

import React, { useRef } from "react";
import PropTypes from "prop-types";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

export default function MarkdownEditor({ value, onChange, height, previewStyle }) {
  const editor = useRef(null);

  const handleChange = () => {
    onChange(editor.current.getInstance().getMarkdown());
  };

  return (
    <Editor
      initialValue={value}
      previewStyle={previewStyle}
      height={height}
      initialEditType="markdown"
      onChange={handleChange}
      ref={editor}
    />
  );
}

MarkdownEditor.defaultProps = {
  height: "auto",
  previewStyle: "vertical",
};

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  height: PropTypes.string,
  previewStyle: PropTypes.string,
};
