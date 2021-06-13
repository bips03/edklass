import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Menu, Icon, Modal, Form, Segment, Button } from "semantic-ui-react";
import "./Channels.css";
import firebase from "../../server/firebase";

function Channels(props) {
  const [mod, setMod] = useState(false);
  const [newCh, setNewCh] = useState({
    name: "",
    description: "",
  });
  const [channelsState, setChannelsState] = useState([]);

  const channelsRef = firebase.database().ref("channels");

  useEffect(() => {
    channelsRef.on("child_added", (snap) => {
      setChannelsState((currentState) => {
        let updatedState = [...currentState];
        updatedState.push(snap.val());
        return updatedState;
      });
    });
  }, []);

  const chStyle = {
    padding: "5px 10px",
    minHeight: "20px",
  };

  const showName = (name) => {
    alert(`You clicked on ${name} channel! `)
  }

  const displayChannels = () => {
    if (channelsState.length > 0) {
      return channelsState.map((channel) => {
        return (
          <Menu.Item
            key={channel.id}
            style={chStyle}
            name=  {channel.name}
          >{'# ' + channel.name}</Menu.Item>
        );
      });
    }
  };

  const openMod = () => {
    setMod(!mod);
  };

  const handleInput = (e) => {
    let newObj = {
      ...newCh,
      [e.target.name]: e.target.value,
    };

    setNewCh(newObj);
  };

  const checkIfFormValid = () => {
    return newCh && newCh.name && newCh.description;
  };

  const onSubmit = async () => {
    if (!checkIfFormValid()) {
      return;
    }

    const key = channelsRef.push().key;

    const channel = {
      id: key,
      name: newCh.name,
      description: newCh.description,
      created_by: {
        name: props.user.displayName,
        avatar: props.user.photoURL,
      },
    };

    await channelsRef.child(key).update(channel);
    setNewCh({ name: "", description: "" });
    openMod();
  };

  return (
    <div>
      <Menu.Menu style={{ marginTop: "20px" }}>
        <Menu.Item style={{ fontSize: "15px" }}>
          <span>
            <Icon name="exchange" /> Channels :{channelsState.length}
          </span>
        </Menu.Item>
        {displayChannels()}
        <Menu.Item style={{ fontSize: "15px" }}>
          <span className="clickable" onClick={openMod}>
            <Icon name="add" /> Add
          </span>
        </Menu.Item>
      </Menu.Menu>

      <Modal open={mod} onClose={openMod}>
        <Modal.Header>Channels</Modal.Header>
        <Modal.Content>
          <Form onSubmit={onSubmit}>
            <Segment stacked>
              <Form.Input
                name="name"
                value={newCh.name}
                onChange={handleInput}
                type="text"
                placeholder="Enter Channel Name"
              />
              <Form.Input
                name="description"
                value={newCh.description}
                onChange={handleInput}
                type="text"
                placeholder="Enter Channel Description"
              />
            </Segment>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onSubmit}>
            <Icon name="checkmark" />
            Save
          </Button>
          <Button onClick={openMod}>
            <Icon name="remove" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(Channels);
