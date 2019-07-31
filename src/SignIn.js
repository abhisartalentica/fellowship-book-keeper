import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      toggleView: false,
      classes: makeStyles(theme => ({
        "@global": {
          body: {
            backgroundColor: theme.palette.common.white
          }
        },
        paper: {
          marginTop: theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main
        },
        form: {
          width: "100%", // Fix IE 11 issue.
          marginTop: theme.spacing(1)
        },
        submit: {
          margin: theme.spacing(3, 0, 2)
        }
      }))
    };
  }

  poolData = {
    UserPoolId: "ap-south-1_FenySRVT7", // Your user pool id here
    ClientId: "3dkoljtulnt2gm119v99lu0d3" // Your client id here
  };

  isSessionValid() {
    const userPool = new CognitoUserPool(this.poolData);
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function(err, session) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        console.log("session validity: " + session.isValid());
      });
    }
  }

  componentDidMount() {
    this.isSessionValid();
  }
  
  setEmail = email => this.setState({ email });
  setPassword = password => this.setState({ password });
  toggleView = () =>
    this.setState({
      toggleView: !this.state.toggleView,
      email: "",
      password: ""
    });

  poolData = {
    UserPoolId: "ap-south-1_FenySRVT7", // Your user pool id here
    ClientId: "3dkoljtulnt2gm119v99lu0d3" // Your client id here
  };

  signUp = () => {
    const { email, password } = this.state;
    const userPool = new CognitoUserPool(this.poolData);

    const attributeList = [];

    const dataEmail = {
      Name: "email",
      Value: email
    };
    var dataName = {
      Name: "name",
      Value: "karan"
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);
    const attributeName = new CognitoUserAttribute(dataName);

    attributeList.push(attributeEmail);
    attributeList.push(attributeName);

    userPool.signUp(email, password, attributeList, null, function(
      err,
      result
    ) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      var cognitoUser = result.user;
      console.log("user name is " + cognitoUser.getUsername());
    });
  };

  signIn = () => {
    const authenticationData = {
      Username: this.state.email,
      Password: this.state.password
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);

    const userPool = new CognitoUserPool(this.poolData);
    const userData = {
      Username: this.state.email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        var accessToken = result.getAccessToken().getJwtToken();
        console.log(accessToken);
        this.setState({ email: "", password: "" });
        //POTENTIAL: Region needs to be set if not already set previously elsewhere.
        // AWS.config.region = '<region>';

        // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        //     IdentityPoolId : '...', // your identity pool id here
        //     Logins : {
        //         // Change the key below according to the specific region your user pool is in.
        //         'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : result.getIdToken().getJwtToken()
        //     }
        // });

        // //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
        // AWS.config.credentials.refresh((error) => {
        //     if (error) {
        //          console.error(error);
        //     } else {
        //          // Instantiate aws sdk service objects now that the credentials have been updated.
        //          // example: var s3 = new AWS.S3();
        //          console.log('Successfully logged!');
        //     }
        // });
      },

      onFailure: function(err) {
        alert(err.message || JSON.stringify(err));
      }
    });
  };
  render() {
    const { toggleView, email, password } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={this.state.classes.paper}>
          <Avatar className={this.state.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {toggleView ? "Sign Up" : "Sign In"}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={e => this.setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={e => this.setPassword(e.target.value)}
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          {!toggleView && (
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={this.state.classes.submit}
            onClick={() => (toggleView ? this.signUp() : this.signIn())}
          >
            {toggleView ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container>
            <Grid item>
              {!toggleView && (
                <Link
                  href="#"
                  onClick={() => this.toggleView()}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              )}
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}
