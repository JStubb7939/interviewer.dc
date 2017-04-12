import React from 'react';
import * as recorder from '../Services/interviewRecorder.js';
import * as rtc from '../Services/interviewRtcHandler.js';
// import * as lobby from '../Services/interviewLobby.js';

class InterviewRoom extends React.Component {
  constructor (props) {
    super(props);

    // We will receive from props:
        // lobby name
        // elements to render (white board, codeshare, etc)
        // admin?

    this.start = recorder.start;
    this.stop = recorder.stop;
    this.save = recorder.save;
  }

  componentWillMount() {
    console.log('will mount (pre-render)');
  }

  componentDidMount() {
    console.log('did mount (post-render)');
    document.getElementById('start').disabled = false;
    document.getElementById('stop').disabled = true;
    document.getElementById('save').disabled = true;
    document.getElementById('close-room').disabled = true;

    recorder.initializeRecorder();
    rtc.initializeConnection();
  }

  render() {
    return (
      <div>
        <div id="elementToShare">
          <header>
            <h2>DEE SEE LOBBEE V3</h2>
            <div id="roomStatusText"></div>
            <div id="userRoleText"></div>
          </header>

          <input type="text" id="room-id"></input>
          <button id="open-room">Open Room</button>
          <button id="join-room">Join Room</button>
          <br /><br />
          <button id="close-room">Waiting for session...</button>

          <div id="videos-container"></div>

        </div>
        <div id="recordControls">
          <button id="start" onClick={this.start}>Start Canvas Recording</button>
          <button id="stop" onClick={this.stop}>Stop</button>
          <button id="save" onClick={this.save}>Save</button>
          <div id="room-urls"></div>
        </div>
      </div>
    );
  }
}

module.exports = InterviewRoom;