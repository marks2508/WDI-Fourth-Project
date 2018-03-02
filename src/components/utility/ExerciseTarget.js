import React from 'react';

class ExerciseTarget extends React.Component {
  state = {
    exercise: {
      time: ''
    }
  }

  componentDidMount ()  {
    const v = new Date();
    const time = Object.assign({}, this.state.time, {time: v});
    this.setState({ time});

  }



  render() {
    return (

      <main>
        <div>
          <h2>hi</h2>
          {/* <h2>{this.state.time}</h2> */}
        </div>
      </main>


    );
  }



}
export default ExerciseTarget;


// user creates a dog
// chooses breed from selection
// each breed has an average weight
//
// each day
