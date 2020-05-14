import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import PageHeader from "./PageHeader";
import MardownEditor from "../MardownEditor";
import metaInputs from "../MetaInputs";
import { updateContent, updateTitle, updateMeta } from "../../slices/pages";

const PageWrapper = styled.div`
  padding: 20px;
`;

const PageContent = styled.div`
  margin-top: 35px;
`;

function Page({ title, meta, content, onContentChange, onTitleChange, onMetaChange }) {
  return (
    <PageWrapper>
      <PageHeader
        onMetaChange={onMetaChange}
        onTitleChange={onTitleChange}
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
};

const getMeta = (state, pageId, properties) => {
  const { meta } = state.pages[pageId];

  return properties.map((property) => {
    const MetaInput = metaInputs[property.type];

    return {
      propertyId: property.id,
      name: property.name,
      MetaInput,
      value: meta[property.id] !== undefined ? meta[property.id] : MetaInput.defaultValue,
    };
  });
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
