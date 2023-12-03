import { SubmitHandler, SubmitErrorHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { IForm } from '../../../types/Iform';
import { useNavigate } from 'react-router-dom';
import { addProfile } from '../../../store/reducers/formSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../../utils/yup';
import converToBase64 from '../../../utils/consertToBese64';
import Header from '../../Header/Header';

export default function ControledForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver<IForm>(schema),
  });
  const { countries } = useAppSelector((state) => state.formReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submit: SubmitHandler<IForm> = async (data) => {
    const { name, age, email, gender, files, country, password, accept } = data;
    const file = (await converToBase64(files[0])) as string;
    dispatch(
      addProfile({
        name,
        age,
        file,
        email,
        gender,
        country,
        password,
        accept,
      })
    );
    navigate('/');
  };

  const error: SubmitErrorHandler<IForm> = async (data) => {
    console.log('Error', data);
  };

  return (
    <div className="conteiner">
      <Header></Header>
      <div className="form-box">
        <form onSubmit={handleSubmit(submit, error)} className="contact_edit">
          <div className="item">
            <label htmlFor="name" className="item__name">
              Name:
            </label>
            <div className="item__value">
              <input type="text" id="name" {...register('name', { required: 'No name' })} />
              <div className="error_messege">{errors.name ? errors.name.message : ''}</div>
            </div>
          </div>
          <div className="item">
            <label htmlFor="age" className="item__name">
              Age
            </label>
            <div className="item__value">
              <input type="text" id="age" {...register('age')} />
              <div className="error_messege">{errors.age ? errors.age.message : ''}</div>
            </div>
          </div>
          <div className="item">
            <label htmlFor="email" className="item__name">
              Email:
            </label>
            <div className="item__value">
              <input type="email" id="email" {...register('email')} />
              <div className="error_messege">{errors.email ? errors.email.message : ''}</div>
            </div>
          </div>
          <div className="item">
            <label htmlFor="password" className="item__name">
              Password:
            </label>
            <div className="item__value">
              <input type="password" id="password" {...register('password')} />
              <div className="error_messege">{errors.password ? errors.password.message : ''}</div>
            </div>
          </div>
          <div className="item">
            <label htmlFor="password_r" className="item__name">
              Repeate password:
            </label>
            <div className="item__value">
              <input type="password" id="password_r" {...register('passwordRepeat')} />
              <div className="error_messege">
                {errors.passwordRepeat ? errors.passwordRepeat.message : ''}
              </div>
            </div>
          </div>
          <div className="item">
            <span className="item__name">Gender:</span>
            <div className="item__value" id="gender">
              <div>
                <label>
                  <input type="radio" value="male" {...register('gender')} />
                  <span>male</span>
                </label>
                <label>
                  <input type="radio" value="female" {...register('gender')} />
                  <span>female</span>
                </label>
              </div>
              <div className="error_messege">{errors.gender ? errors.gender.message : ''}</div>
            </div>
          </div>

          <div className="item">
            <label htmlFor="file" className="item__name">
              Upload file:
            </label>
            <div className="item__value">
              <input type="file" formMethod="post" id="file" {...register('files')} />
              <div className="error_messege">{errors.files ? errors.files.message : ''}</div>
            </div>
          </div>

          <div className="item">
            <label htmlFor="country" className="item__name">
              Country:
            </label>
            <div className="item__value">
              <div>
                <input list="country-list" type="text" id="country" {...register('country')} />
                <datalist id="country-list">
                  {countries.map((el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))}
                </datalist>
              </div>
              <div className="error_messege">{errors.country ? errors.country.message : ''}</div>
            </div>
          </div>
          <div className="item__value">
            <label>
              <input type="checkbox" {...register('accept')} />
              <span>accept T&C</span>
            </label>
            <div className="error_messege">{errors.accept ? errors.accept.message : ''}</div>
          </div>
          <div className="item__submit">
            <button type="submit" disabled={!isDirty || !isValid}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
