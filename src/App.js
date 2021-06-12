import React from 'react';
import './App.css';
import  Sidebar from './components/sidebar/Sidebar'
import { Grid} from 'semantic-ui-react'



function App() {
  return (
    <Grid columns="equal">
    <Sidebar />

    <Grid.Column width={3}>
      <span>

      </span>
    </Grid.Column>
  </Grid>
  )
}

export default App;
