import classes from "./Repos.module.css";

import { reposProps } from "../interfaces/repos";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

import Repo from "../components/Repo";

const Repos = () => {
  const { username } = useParams();
  const [repos, setRepos] = useState<reposProps[] | [] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const loadRepos = async (username: string) => {
      setIsLoading(true);
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const data = await response.json();
      setIsLoading(false);

      let orderedRepos = data.sort(
        (a: reposProps, b: reposProps) =>
          b.stargazers_count - a.stargazers_count
      );

      orderedRepos = orderedRepos.slice(0, 5);

      setRepos(orderedRepos);
    };

    if (username) {
      loadRepos(username);
    }
  }, []);

  if (!repos && isLoading) return <Loader />;

  return (
    <div className={classes.repos}>
      <BackButton />
      <h2>Explorando os repositórios do usuário: {username}</h2>
      {repos && repos.length === 0 && <p>Não há repositórios!</p>}
      {repos && repos.length > 0 && (
        <div className={classes.container}>
          {repos.map((repo) => (
            <Repo key={repo.name} {...repo} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Repos;
