import React from 'react';
import { withRouter } from 'react-router-dom';

const BackButton = ({history}) => {
  return (
    <div>
      <button onClick={history.goBack} className="btn btn-primary">Back</button>
    </div>
  );
};

export default withRouter(BackButton);
