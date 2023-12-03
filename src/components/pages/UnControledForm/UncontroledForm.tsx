import { useAppDispatch, useAppSelector } from '../../../store/store';
import { schema } from '../../../utils/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { addProfile } from '../../../store/reducers/formSlice';
import converToBase64 from '../../../utils/consertToBese64';
import Header from '../../Header/Header';
import { useNavigate } from 'react-router';

interface FormFields {
  name: HTMLInputElement;
  age: HTMLInputElement;
  email: HTMLInputElement;
  gender: HTMLInputElement;
  password: HTMLInputElement;
  passwordRepeat: HTMLInputElement;
  files: HTMLInputElement;
  accept: HTMLInputElement;
  country: HTMLInputElement;
}
interface Errors {
  name?: string;
  age?: string;
  email?: string;
  gender?: string;
  password?: string;
  passwordRepeat?: string;
  files?: string;
  accept?: string;
  country?: string;
}

export default function UncontroledForm() {
  const { countries } = useAppSelector((state) => state.formReducer);
  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        console.log(result);
        setErrors(() => result);
      }
    }
  };

  return (
    <div className="conteiner">
      <Header></Header>
      <div className="form-box">
        <form onSubmit={handleSubmit} className="contact_edit">
          <div className="item">
            <label htmlFor="name" className="item__name">
              Name:
            </label>
            <div className="item__value">
              <input type="text" id="name" name="name" />
              <div className="error_messege">{errors.name ? errors.name : ''}</div>
            </div>
          </div>
          <div className="item">
            <label htmlFor="age" className="item__name">
              Age
            </label>
            <div className="item__value">
              <input type="text" id="age" name="age" />
              <div className="error_messege">{errors.age ? errors.age : ''}</div>
            </div>
          </div>
          <div className="item">
            <label htmlFor="email" className="item__name">
              Email:
            </label>
            <div className="item__value">
              <input type="email" id="email" name="email" />
              <div className="error_messege">{errors.email ? errors.email : ''}</div>
            </div>
          </div>
          <div className="item">
            <label htmlFor="password" className="item__name">
              Password:
            </label>
            <div className="item__value">
              <input type="password" id="password" name="password" />
              <div className="error_messege">{errors.password ? errors.password : ''}</div>
            </div>
          </div>
          <div className="item">
            <label htmlFor="password_r" className="item__name">
              Repeate password:
            </label>
            <div className="item__value">
              <input type="password" id="password_r" name="passwordRepeat" />
              <div className="error_messege">
                {errors.passwordRepeat ? errors.passwordRepeat : ''}
              </div>
            </div>
          </div>
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
  );
}
