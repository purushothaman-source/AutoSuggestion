import useTrie from "./utils/useTrie";
import "./index.css";
import { useRef, useState } from "react";

function App() {
  const inputRef = useRef("");
  const [value, setValue] = useState("");
  const [words, setWords] = useState([]);
  const { addWord, suggestWords, searchWord } = useTrie();

  const add = () => {
    addWord(value);
    setValue("");
  };

  return (
    <>
      <div className="input-wrapper">
        <input
          type="text"
          value={value}
          ref={inputRef}
          onChange={e => {
            setWords(suggestWords(e.target.value));
            setValue(e.target.value);
          }}
          onKeyDown={e => {
            e.key === "Escape" && setValue("");
            e.key === "Enter" && value && !searchWord(value) && add();
          }}
        />
        <div>
          <button disabled={value ? searchWord(value) : true} onClick={add}>
            Add Word To Dict
          </button>
        </div>
      </div>
      <div class="content-wrapper">
        {!value ? (
          <div className="placeholder">
            Welcome to auto suggestions , Start typing...{" "}
          </div>
        ) : words.length === 0 ? (
          <div className="placeholder"> You have 0 suggestions</div>
        ) : (
          <div class="content">
            {words.map(item => {
              return (
                <div
                  class="chip"
                  onClick={() => {
                    inputRef.current && inputRef.current.focus();
                    setValue(item);
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
