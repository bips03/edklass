import React from "react";
import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from 'react-router-dom'
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "./Copyright";
import firebase from "../../server/firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  let userCollectionRef = firebase
    .database()
    .ref("users");

  const handleInput = (e) => {
    let newObj = {
      ...user,
      [e.target.name]: e.target.value,
    };

    setUser(newObj);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      await updateUserDetails(createdUser);

      alert("User created!");
    } catch (err) {
      alert(err.message);
    }

    setUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const updateUserDetails = async (createdUser) => {
    if (createdUser) {
      try {
        await createdUser.user.updateProfile({
          displayName: user.firstName + " " + user.lastName,
          photoURL: `http://gravatar.com/avatar/${createdUser.user.uid}?d=identicon`,
        });

        await saveInDb(createdUser);

        console.log("Saved in database");
        console.log(createdUser)
      } catch (err) {
        alert("Server error");
      }
    }
  };

  const saveInDb = async (createdUser) => {
    try {
      await userCollectionRef.child(createdUser.user.uid).set({
        displayName: createdUser.user.displayName,
        photoURL: createdUser.user.photoURL,
      });
    
    } catch (err) {
      alert("server error");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                value={user.firstName}
                label="First Name"
                autoFocus
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={user.lastName}
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={user.email}
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={user.password}
                autoComplete="current-password"
                onChange={handleInput}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/signin' variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
