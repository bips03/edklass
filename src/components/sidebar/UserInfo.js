import { connect } from "react-redux";
import { Image} from "semantic-ui-react";
import "./UserInfo.css";
import firebase from "../../server/firebase";

function UserInfo(props) {

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("user signed out"));
  };
  if (props.user) {
    return (
      <div className = 'userinfo'>
                    <h2>Ed Klass </h2>
                    {props.user.displayName}
                    <button className='button' onClick={signOut}> Sign out </button>
        </div>
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
