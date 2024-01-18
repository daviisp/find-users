import { useState, KeyboardEvent } from "react";
import { BsSearch } from "react-icons/bs";

import classes from "./Search.module.css";

type SearchProps = {
  loadUser: (username: string) => Promise<void>;
};

const Search = ({ loadUser }: SearchProps) => {
  const [username, setUsername] = useState("");

  const handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === "Enter") {
      loadUser(username);
    }
  };

  return (
    <div className={classes.search}>
      <h2>Busque por um usuário:</h2>
      <p>Conheça os melhores repositórios:</p>
      <div className={classes.search_container}>
        <input
          type="text"
          placeholder="Digite o nome do usuário:"
          onChange={(ev) => setUsername(ev.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => loadUser(username)}>
          <BsSearch />
        </button>
      </div>
    </div>
  );
};
export default Search;
