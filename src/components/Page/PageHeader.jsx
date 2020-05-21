import React from "react";
import PropTypes from "prop-types";
import InlineInput from "../InlineInput";
import PageMeta from "./PageMeta";

function PageHeader({ title, meta, onTitleChange, onMetaChange, onAdditionalChange }) {
  return (
    <header className="page-header">
      <InlineInput onChange={onTitleChange} tagName="h1" value={title} />

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
