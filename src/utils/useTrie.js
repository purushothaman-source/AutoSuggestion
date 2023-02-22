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
    console.log("changing");
    let items = JSON.parse(localStorage.getItem("items")) || [];
    for (let index = 0; index < items.length; index++) {
      addWord(items[index], true);
    }
  }, [trie, addWord]);

  return { addWord, searchWord, removeWord, suggestWords };
};

export default useTrie;
