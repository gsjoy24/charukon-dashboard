import JoditEditor from "jodit-react";
const TextEditor = ({ content, setContent }) => {
	return <JoditEditor value={content} onBlur={(newContent) => setContent(newContent)} />;
};

export default TextEditor;
