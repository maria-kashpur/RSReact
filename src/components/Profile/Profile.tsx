import './profile.scss';
import { IProfile } from '../../types/Iform';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface IProps {
  data: IProfile;
  light?: boolean;
}

export default function Profile(props: IProps) {
  const [light, setLight] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (props.light) {
      setLight(() => true);
      setTimeout(() => {
        setLight(false);
      }, 2000);
    }
  }, [props.light]);
  console.log(location.state);

  const { file, name, age, gender, country, email, password, accept } = props.data;
  return (
    <div className={`profile ${light ? 'light' : ''}`}>
      <div className="contact_img">
        <img src={file} alt="image" />
      </div>
      <div className="contact_name contact__item">
        <span className="item__name">Name:</span>
        <span>{name}</span>
      </div>
      <div className="contact_age contact__item">
        <span className="item__name">Age:</span>
        <span>{age}</span>
      </div>
      <div className="contact_gender contact__item">
        <span className="item__name">Gender:</span>
        <span>{gender}</span>
      </div>
      <div className="contact_country contact__item">
        <span className="item__name">Country:</span>
        <span>{country}</span>
      </div>
      <div className="contact_email contact__item">
        <span className="item__name">Email:</span>
        <span>{email}</span>
      </div>
      <div className="contact_password contact__item">
        <span className="item__name">Password:</span>
        <span>{password}</span>
      </div>
      <div className="contact__item">
        <span className="item__name">Accept:</span>
        <span>{accept ? 'yes' : 'no'}</span>
      </div>
    </div>
  );
}
