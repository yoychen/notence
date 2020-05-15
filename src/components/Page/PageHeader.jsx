import React from "react";
import PropTypes from "prop-types";
import ContentEditable from "react-contenteditable";
import PageMeta from "./PageMeta";

function PageHeader({ title, meta, onTitleChange, onMetaChange, onAdditionalChange }) {
  const handleTitleChange = (event) => {
    onTitleChange(event.target.value);
  };

  return (
    <header className="page-header">
      <ContentEditable onChange={handleTitleChange} tagName="h1" html={title} />

      <PageMeta onMetaChange={onMetaChange} meta={meta} onAdditionalChange={onAdditionalChange} />
    </header>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  meta: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onMetaChange: PropTypes.func.isRequired,
  onAdditionalChange: PropTypes.func.isRequired,
};

export default PageHeader;
