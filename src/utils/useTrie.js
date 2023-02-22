import data from "./data";
import { Trie } from "@purushothkabaddi/js-dsa";
import { useCallback, useEffect, useState } from "react";

const useTrie = () => {
  const [trie] = useState(new Trie());

  const addWord = useCallback(
    (word, skip = false) => {
      trie.insert(word);
      let items = JSON.parse(localStorage.getItem("items")) || [];
      items = [...items, word];
      !skip && localStorage.setItem("items", JSON.stringify(items));
    },
    [trie]
  );

  const searchWord = word => {
    return trie.search(word);
  };

  const removeWord = word => {
    trie.remove(word);
  };

  const suggestWords = word => {
    return trie.autoSuggestion(word);
  };

  useEffect(() => {
    let items = JSON.parse(localStorage.getItem("items")) || [];
    for (let index = 0; index < items.length; index++) {
      addWord(items[index], true);
    }
  }, [addWord]);

  useEffect(() => {
    for (let index = 0; index < data.length; index++) {
      addWord(data[index], true);
    }
  }, [addWord]);

  return { addWord, searchWord, removeWord, suggestWords };
};

export default useTrie;
