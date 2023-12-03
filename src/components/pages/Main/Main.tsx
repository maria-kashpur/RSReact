import './main.scss';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import Profile from '../../Profile/Profile';
import Header from '../../Header/Header';
import { clearProfiles } from '../../../store/reducers/formSlice';

export default function Main() {
  const { profiles } = useAppSelector((state) => state.formReducer);
  const dispatch = useAppDispatch();

  return (
    <>
      <Header />
      <div className="conteiner">
        <div className="main">
          {profiles.length > 0 ? (
            <div>
              <button
                className="btn neumorphic-btn"
                onClick={() => {
                  dispatch(clearProfiles());
                }}
              >
                Clear profiles
              </button>
            </div>
          ) : (
            ''
          )}
          <div className="profiles">
            {profiles.length === 0
              ? 'No profiles'
              : profiles.map((el, index) => {
                  const { name, age, email, gender, accept, file, country, password } = el;
                  return (
                    <Profile
                      key={`profole_${index}`}
                      data={{ name, age, email, gender, accept, file, country, password }}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
}
