import { useState } from 'react';
import s from './btn_error.module.scss';
import dementorImg from '../../public/dementor_png_by_shutupdemi_d6w1fnh-pre.png';
import React from 'react';
import Image from 'next/image';

const BtnError = () => {
  const [hasError, setHasError] = useState(false);
  if (hasError) throw new Error('button Error');

  return (
    <div className={s.error_btn_box} data-testid="BtnError">
      <button className={s.btn_error} onClick={() => setHasError(true)}>
        <Image src={dementorImg} alt="dementor" width={68} height={68} priority={false} />
      </button>
    </div>
  );
};

export default BtnError;
