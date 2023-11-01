import { useState } from 'react';
import './btn_erroe.scss';
import dementorImg from '../../../assets/images/dementor_png_by_shutupdemi_d6w1fnh-pre.png';

export default function BtnError() {
  const [hasError, setHasError] = useState(false);
  if (hasError) throw Error('button Error');

  return (
    <div className="error_btn_box">
      <button className="btn-error" onClick={() => setHasError(true)}>
        <img src={dementorImg} alt="dementor" />
      </button>
    </div>
  );
}
