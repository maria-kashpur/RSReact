import './profile.scss';
import { IProfile } from '../../types/Iform';

interface IProps {
  data: IProfile;
}

export default function Profile(props: IProps) {
  const { file, name, age, gender, country, email, password, accept } = props.data;
  return (
    <div className="profile">
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
