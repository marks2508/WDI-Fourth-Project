import React from 'react';

const BackButton = ({history}) => {
  return (
    <div>
      <button onClick={history.goBack} className="btn btn-primary">Back</button>
    </div>
  );
};

export default BackButton;
