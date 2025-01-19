import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import WysiwygEditor from './components/WysiwygEditor';

// Mock the translations to avoid dealing with external files during tests
jest.mock('./Locales/staticTexts.json', () => ({
  toolbar: {
    bold: 'Bold',
    italic: 'Italic',
    underline: 'Underline',
  },
  editor: {
    placeholder: 'Start typing below: ',
  },
  app: {
    controlledMode: 'Controlled Mode',
    uncontrolledMode: 'Uncontrolled Mode',
  },
}));

describe('WYSIWYG Editor', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  test('should render the editor in uncontrolled mode and not reflect content externally', () => {
    render(<App />);

    const boldButton = screen.getByTestId('bold-button-uncontrolled');
    const italicButton = screen.getByTestId('italic-button-uncontrolled');
    const underlineButton = screen.getByTestId('underline-button-uncontrolled');

    expect(boldButton).not.toHaveClass('active');
    expect(italicButton).not.toHaveClass('active');
    expect(underlineButton).not.toHaveClass('active');

    fireEvent.click(boldButton);
    fireEvent.click(italicButton);
    fireEvent.click(underlineButton);

    expect(boldButton).toHaveClass('active');
    expect(italicButton).toHaveClass('active');
    expect(underlineButton).toHaveClass('active');
  });

  test('should toggle bold style when bold button is clicked in controlled mode', () => {
    const setEditorContent = jest.fn();
    render(<WysiwygEditor value="" onChange={setEditorContent} />);

    const boldButton = screen.getByTestId('bold-button');

    expect(boldButton).not.toHaveClass('active');
    fireEvent.click(boldButton);

    expect(setEditorContent).toHaveBeenCalledTimes(1);
    expect(boldButton).toHaveClass('active');

    fireEvent.click(boldButton);
    expect(setEditorContent).toHaveBeenCalledTimes(2);
    expect(boldButton).not.toHaveClass('active');
  });

  test('should toggle italic style when italic button is clicked in controlled mode', () => {
    const setEditorContent = jest.fn();
    render(<WysiwygEditor value="" onChange={setEditorContent} />);

    const italicButton = screen.getByTestId('italic-button');

    expect(italicButton).not.toHaveClass('active');
    fireEvent.click(italicButton);

    expect(setEditorContent).toHaveBeenCalledTimes(1);
    expect(italicButton).toHaveClass('active');

    fireEvent.click(italicButton);
    expect(setEditorContent).toHaveBeenCalledTimes(2);
    expect(italicButton).not.toHaveClass('active');
  });

  test('should toggle underline style when underline button is clicked in controlled mode', () => {
    const setEditorContent = jest.fn();
    render(<WysiwygEditor value="" onChange={setEditorContent} />);

    const underlineButton = screen.getByTestId('underline-button');

    expect(underlineButton).not.toHaveClass('active');
    fireEvent.click(underlineButton);

    expect(setEditorContent).toHaveBeenCalledTimes(1);
    expect(underlineButton).toHaveClass('active');

    fireEvent.click(underlineButton);
    expect(setEditorContent).toHaveBeenCalledTimes(2);
    expect(underlineButton).not.toHaveClass('active');
  });

  test('should render in controlled mode with initial content', () => {
    const initialContent = '{"entityMap":{},"blocks":[{"key":"5k2k7","text":"Hello, world!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}';
    const setEditorContent = jest.fn();

    render(<WysiwygEditor value={initialContent} onChange={setEditorContent} />);
    
    const editor = screen.getByRole('textbox');
    expect(editor).toHaveTextContent('Hello, world!');
  });
});
