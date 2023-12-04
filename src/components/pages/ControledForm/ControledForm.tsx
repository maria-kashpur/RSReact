import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { IForm } from '../../../types/Iform';
import { useNavigate } from 'react-router-dom';
import { addProfile } from '../../../store/reducers/formSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../../utils/yup';
import converToBase64 from '../../../utils/consertToBese64';
import Header from '../../Header/Header';
import PasswordStrength from '../../PasswordStrength/PasswordStrength';
import getPasswordStrength from '../../../utils/getPasswordStrength';
import InputWrap from '../../FormElements/InputWrap/InputWrap';
import Password from '../../FormElements/Password/Password';

export default function ControledForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid, dirtyFields },
    watch,
  } = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver<IForm>(schema),
  });
  const { countries } = useAppSelector((state) => state.formReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const watchPassword = watch('password');

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
    navigate('/', { state: { key: 'controled-form' } });
  };

  return (
    <>
      <Header></Header>
      <div className="conteiner">
        <div className="form-box">
          <form onSubmit={handleSubmit(submit)} className="contact_edit">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <InputWrap
                  label={'Name:'}
                  type={'text'}
                  id={'name'}
                  placeholder={'Name'}
                  error={errors.name ? errors.name.message || '' : ''}
                  {...field}
                />
              )}
            />
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <InputWrap
                  label={'Age:'}
                  type={'number'}
                  id={'age'}
                  placeholder={'Age'}
                  error={errors.age ? errors.age.message || '' : ''}
                  {...field}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputWrap
                  label={'Email:'}
                  type={'email'}
                  id={'email'}
                  placeholder={'Email'}
                  error={errors.email ? errors.email.message || '' : ''}
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Password
                  label={'Password'}
                  id={'password'}
                  placeholder={'Password'}
                  error={errors.password && errors.password.message ? errors.password.message : ''}
                  {...field}
                >
                  <PasswordStrength
                    strength={getPasswordStrength(watchPassword || '')}
                    visible={dirtyFields.password}
                  />
                </Password>
              )}
            />

            <Controller
              name="passwordRepeat"
              control={control}
              render={({ field }) => (
                <Password
                  label={'Repeate password:'}
                  id={'password_r'}
                  placeholder={'Repeate password'}
                  error={
                    errors.passwordRepeat && errors.passwordRepeat.message
                      ? errors.passwordRepeat.message
                      : ''
                  }
                  {...field}
                ></Password>
              )}
            />

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
    </>
  );
}
