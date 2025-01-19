import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import { WysiwygEditorProps } from "./types";
import "./style.css";
import translations from "../../Locales/staticTexts.json";

const WysiwygEditor: React.FC<WysiwygEditorProps> = ({
  value,
  onChange,
  className = "",
  style = {},
  renderToolbar,
}) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const [loading, setLoading] = useState<boolean>(false);

  // Simulate async content fetching (e.g., from an API) fo uncontrlled
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      // Simulate a delay as if fetching from an API
      const timeoutId =  setTimeout(() => {
        const initialContent =
          '{"entityMap":{},"blocks":[{"key":"5k2k7","text":"Hello, world!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}';
        setEditorState(
          EditorState.createWithContent(
            convertFromRaw(JSON.parse(initialContent))
          )
        );
        setLoading(false); 
      }, 2000); 
      return () => clearTimeout(timeoutId);
    };

    if (!onChange) fetchContent();
  }, [onChange]);

  useEffect(() => {
    if (value) {
      try {
        const contentState = convertFromRaw(JSON.parse(value));
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        console.error("Error parsing content state:", error);
      }
    }
  }, [value]);

  const handleEditorChange = useCallback(
    (state: EditorState) => {
      setEditorState(state);
      if (onChange) {
        const contentState = state.getCurrentContent();
        onChange(JSON.stringify(contentState));
      }
    },
    [onChange]
  );

  const handleBold = useCallback(() => {
    const newState = RichUtils.toggleInlineStyle(editorState, "BOLD");
    handleEditorChange(newState);
  }, [editorState, handleEditorChange]);

  const handleItalic = useCallback(() => {
    const newState = RichUtils.toggleInlineStyle(editorState, "ITALIC");
    handleEditorChange(newState);
  }, [editorState, handleEditorChange]);

  const handleUnderline = useCallback(() => {
    const newState = RichUtils.toggleInlineStyle(editorState, "UNDERLINE");
    handleEditorChange(newState);
  }, [editorState, handleEditorChange]);

  const defaultToolbar = useMemo(
    () => (
      <div className="toolbar">
        <button
          onClick={handleBold}
          aria-label={translations?.toolbar?.bold}
          data-testid={`bold-button${onChange ? "" : "-uncontrolled"}`}
          className={
            editorState.getCurrentInlineStyle().has("BOLD") ? "active" : ""
          }
        >
          {translations?.toolbar?.bold}
        </button>
        <button
          onClick={handleItalic}
          aria-label={translations?.toolbar?.italic}
          data-testid={`italic-button${onChange ? "" : "-uncontrolled"}`}
          className={
            editorState.getCurrentInlineStyle().has("ITALIC") ? "active" : ""
          }
        >
          {translations?.toolbar?.italic}
        </button>
        <button
          onClick={handleUnderline}
          aria-label={translations?.toolbar?.underline}
          data-testid={`underline-button${onChange ? "" : "-uncontrolled"}`}
          className={
            editorState.getCurrentInlineStyle().has("UNDERLINE") ? "active" : ""
          }
        >
          {translations?.toolbar?.underline}
        </button>
      </div>
    ),
    [editorState, handleBold, handleItalic, handleUnderline, value]
  );

  return (
    <div className={`editor-container ${className}`} style={style}>
      {renderToolbar
        ? renderToolbar({
            onBold: handleBold,
            onItalic: handleItalic,
            onUnderline: handleUnderline,
          })
        : defaultToolbar}
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        placeholder={
          !onChange && loading
            ? translations?.editor?.loading
            : translations?.editor?.placeholder
        }
      />
    </div>
  );
};

export default React.memo(WysiwygEditor);
