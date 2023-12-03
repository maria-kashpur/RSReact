import { useAppDispatch, useAppSelector } from '../../../store/store';
import { schema } from '../../../utils/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { addProfile } from '../../../store/reducers/formSlice';
import converToBase64 from '../../../utils/consertToBese64';
import Header from '../../Header/Header';
import { useNavigate } from 'react-router';
import { Errors, FormFields } from '../../../types/Iform';
import InputWrap from '../../FormElements/InputWrap/InputWrap';
import Password from '../../FormElements/Password/Password';
import PasswordStrength from '../../PasswordStrength/PasswordStrength';
import getPasswordStrength from '../../../utils/getPasswordStrength';

export default function UncontroledForm() {
  const { countries } = useAppSelector((state) => state.formReducer);
  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [visiblePasswordStrength, setVisiblePasswordStrength] = useState(false);
  const [valuePasswordStrength, setValuePasswordStrength] = useState(0);

  const handleSubmit: React.FormEventHandler<HTMLFormElement & FormFields> = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { name, age, email, gender, password, passwordRepeat, files, accept, country } = form;
    const values = {
      name: name.value,
      age: +age.value,
      email: email.value,
      gender: gender.value,
      password: password.value,
      passwordRepeat: passwordRepeat.value,
      files: files.files,
      accept: accept.checked,
      country: country.value,
    };

    setVisiblePasswordStrength(true);
    setValuePasswordStrength(() => getPasswordStrength(values.password || ''));

    try {
      schema.validateSync(values, { abortEarly: false });
      if (!values || !values.files || !values.files[0]) throw Error('File is not founs');
      const file = await converToBase64(values.files[0]);
      dispatch(
        addProfile({
          name: values.name,
          age: values.age,
          file: file as string,
          email: values.email,
          gender: values.gender,
          country: values.country,
          password: values.password,
          accept: values.accept,
        })
      );
      setVisiblePasswordStrength(false);
      navigate('/', { state: { key: 'uncontroled-form' } });
    } catch (err) {
      const errs = err as yup.ValidationError;
      if (errs.name === 'ValidationError') {
        const result = errs.inner.reduce((acc: { [x: string]: string }, el) => {
          const { path, message } = el;
          if (path && path in acc) {
            const mes = acc[path];
            acc[path] = `${mes}, ${message}`;
          } else if (path) {
            acc[path] = message;
          }
          return acc;
        }, {});
        setErrors(() => result);
      }
    }
  };

  return (
    <>
      <Header></Header>
      <div className="conteiner">
        <div className="form-box">
          <form onSubmit={handleSubmit} className="contact_edit">
            <InputWrap
              label={'Name:'}
              type={'text'}
              id={'name'}
              placeholder={'Name'}
              error={errors.name ? errors.name : ''}
              name="name"
            />
            <InputWrap
              label={'Age:'}
              type={'number'}
              id={'age'}
              placeholder={'Age'}
              error={errors.age ? errors.age : ''}
              name={'age'}
            />

            <InputWrap
              label={'Email:'}
              type={'email'}
              id={'email'}
              placeholder={'Email'}
              error={errors.email ? errors.email : ''}
              name="email"
            />

            <Password
              name="password"
              label={'Password'}
              id={'password'}
              placeholder={'Password'}
              error={errors.password ? errors.password : ''}
            >
              <PasswordStrength
                strength={valuePasswordStrength}
                visible={visiblePasswordStrength}
              />
            </Password>

            <Password
              name="passwordRepeat"
              label={'Repeate password'}
              id={'password_r'}
              placeholder={'Repeate password'}
              error={errors.passwordRepeat ? errors.passwordRepeat : ''}
            />

            <div className="item">
              <span className="item__name">Gender:</span>
              <div className="item__value" id="gender">
                <div>
                  <label>
                    <input type="radio" value="male" name="gender" />
                    <span>male</span>
                  </label>
                  <label>
                    <input type="radio" value="female" name="gender" />
                    <span>female</span>
                  </label>
                </div>
                <div className="error_messege">{errors.gender ? errors.gender : ''}</div>
              </div>
            </div>

            <div className="item">
              <label htmlFor="file" className="item__name">
                Upload file:
              </label>
              <div className="item__value">
                <input type="file" formMethod="post" id="file" name="files" />
                <div className="error_messege">{errors.files ? errors.files : ''}</div>
              </div>
            </div>

            <div className="item">
              <label htmlFor="country" className="item__name">
                Country:
              </label>
              <div className="item__value">
                <div>
                  <input list="country-list" type="text" id="country" name="country" />
                  <datalist id="country-list">
                    {countries.map((el) => (
                      <option key={el} value={el}>
                        {el}
                      </option>
                    ))}
                  </datalist>
                </div>
                <div className="error_messege">{errors.country ? errors.country : ''}</div>
              </div>
            </div>

            <div className="item__value">
              <label>
                <input type="checkbox" name="accept" />
                <span>accept T&C</span>
              </label>
              <div className="error_messege">{errors.accept ? errors.accept : ''}</div>
            </div>
            <div className="item__submit">
              <button className="btn-submit" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
