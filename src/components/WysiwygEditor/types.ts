export interface WysiwygEditorProps {
    value?: string; // For controlled mode
    onChange?: (value: string) => void; // For controlled mode
    className?: string;
    style?: React.CSSProperties;
    renderToolbar?: (props: {
      onBold: () => void;
      onItalic: () => void;
      onUnderline: () => void;
    }) => React.ReactNode;
  }
  