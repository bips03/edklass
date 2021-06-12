import { connect } from "react-redux";
import { Grid, Header, Image, Dropdown } from "semantic-ui-react";
import "./UserInfo.css";
import firebase from "../../server/firebase";

function UserInfo(props) {
  const getDropDownOptions = () => {
    return [
      {
        key: "signout",
        text: <span onClick={signOut}>Sign Out</span>,
      },
    ];
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("user signed out"));
  };
  if (props.user) {
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row className="userinfo_grid_row">
            <Header className="userinfo_displayname" inverted as="h4">
              <Dropdown
                trigger={
                  <span>
                    <Image src={props.user.photoURL} avatar></Image>
                    {props.user.displayName}
                  </span>
                }
                options={getDropDownOptions()}
              ></Dropdown>
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
  return null;
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(UserInfo);
