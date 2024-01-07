import classes from "./Repos.module.css";

import { ReposProps } from "../types/Repos";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

import Repo from "../components/Repo";

const Repos = () => {
  const { username } = useParams();
  const [repos, setRepos] = useState<ReposProps[] | [] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const loadRepos = async (username: string) => {
      setIsLoading(true);
      const res = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await res.json();
      setIsLoading(false);

      let orderedRepos = data.sort(
        (a: ReposProps, b: ReposProps) =>
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