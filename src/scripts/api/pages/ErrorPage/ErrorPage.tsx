import './error_page.scss';
import img from '../../../../assets/images/harry-potter-4077473_1280.png';

export default function ErrorPage() {
  return (
    <div className="not_found">
      <div className="not_found__box">
        <div className="not_found__item"></div>
        <div className="not_found__item">
          <img src={img} alt="error icon" />
        </div>
      </div>
      <div className="not_found__messege">The error was raised and handled</div>
    </div>
  );
}
