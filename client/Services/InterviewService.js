import { EventEmitter } from 'events'
import axios from 'axios'

export default class InterviewService extends EventEmitter {
  constructor() {
    super()
  }

  // addOne(question) {
  //   this.addAQuestion(question, this.getThem.bind(this))
  // }
  getThem(roomDbId) {
    this.getInterviews(roomDbId, this.gotInterviews.bind(this))
  }
  getOne(interviewId) {
    this.getInterview(interviewId, this.gotInterview.bind(this))

  }

  // addAQuestion(question, callback) {
  //   axios.post('/api/Interview', question//meeting_id:roomDbId, question: question
  //   )
  //   .then(function(response) {
  //     callback(question.meeting_id)
  //   })
  // }
  getInterview(id, callback){
    axios.get('/api/Interviews', {
      params:{
        id: id
      }
    }).then(function(response) {
      console.log('getinterviewres', response)
      callback(response.data[0])
    })
    .catch(function (error) {
      console.log('get interview error', error);
    });
  }

  // {
  //       roomid: roomDbId,
  //       owner_id: userid
  //     }

  getInterviews(params, callback) {
    var userid = JSON.parse(localStorage.getItem('googleUser')).user.id;
    //var params = {owner_id: userid}
    axios.get('/api/Interviews', {
      params: params
    })
    .then(function(response) {
      callback(response.data)
    })
    .catch(function (error) {
      console.log('get interviews error', error);
    });
  }
  gotInterviews(interviews) {
    this.emit('got_interviews', interviews)
  }
  gotInterview(interview) {
    this.emit('got_interview', interview)
  }
}