import { useState } from 'react';
import './btn_error.scss';
import dementorImg from '../../../assets/images/dementor_png_by_shutupdemi_d6w1fnh-pre.png';
import React from 'react';

const BtnError = React.memo(() => {
  const [hasError, setHasError] = useState(false);
  if (hasError) throw new Error('button Error');

  return (
    <div className="error_btn_box" data-testid="BtnError">
      <button className="btn-error" onClick={() => setHasError(true)}>
        <img src={dementorImg} alt="dementor" />
      </button>
    </div>
  );
});

export default BtnError;
