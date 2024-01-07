import { useNavigate } from "react-router-dom";

import classes from "./BackButton.module.css";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <button className={classes.back_btn} onClick={() => navigate(-1)}>
        Voltar
      </button>
    </>
  );
};
export default BackButton;
