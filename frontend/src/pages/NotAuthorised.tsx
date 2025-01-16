import { makeStyles } from "@mui/styles";
import React from "react";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const useStyles = makeStyles({
  container: {
    height: "90vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "grey",
    flexDirection: "column",
  },
  message: {
    margin: 0,
  },
});

export default function NotAuthorised() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <SentimentVeryDissatisfiedIcon sx={{fontSize: "10rem"}}/>
      <h1>Not Authorised</h1>
      <p className={styles.message}>Sign up and start using the app</p>
    </div>
  );
}
