import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import PageHeader from "./PageHeader";
import MardownEditor from "../MardownEditor";
import { updateContent, updateTitle, updateMeta, getMetaValue } from "../../slices/pages";
import { updateAdditional } from "../../slices/properties";

const PageWrapper = styled.div`
  padding: 20px;
`;

const PageContent = styled.div`
  margin-top: 35px;
`;

function Page({
  title,
  meta,
  content,
  onContentChange,
  onTitleChange,
  onMetaChange,
  onAdditionalChange,
}) {
  return (
    <PageWrapper>
      <PageHeader
        onMetaChange={onMetaChange}
        onTitleChange={onTitleChange}
        onAdditionalChange={onAdditionalChange}
        title={title}
        meta={meta}
      />

      <PageContent>
        <MardownEditor value={content} onChange={onContentChange} />
      </PageContent>
    </PageWrapper>
  );
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
  meta: PropTypes.arrayOf(PropTypes.object).isRequired,
  content: PropTypes.string.isRequired,
  onContentChange: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onMetaChange: PropTypes.func.isRequired,
  onAdditionalChange: PropTypes.func.isRequired,
};

const getMeta = (state, pageId, properties) => {
  const { meta } = state.pages[pageId];

  return properties.map((property) => ({
    property,
    value: getMetaValue(meta, property),
  }));
};

const mapStateToProps = (state, { pageId, properties }) => ({
  title: state.pages[pageId].title,
  meta: getMeta(state, pageId, properties),
  content: state.pages[pageId].content,
});

const mapDispatchToProps = (dispatch, { pageId }) => {
  return {
    onContentChange: (content) => dispatch(updateContent({ pageId, content })),
    onTitleChange: (title) => dispatch(updateTitle({ pageId, title })),
    onMetaChange: (propertyId, value) => dispatch(updateMeta({ pageId, propertyId, value })),
    onAdditionalChange: (propertyId, additionalChange) =>
      dispatch(updateAdditional({ propertyId, additionalChange })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
