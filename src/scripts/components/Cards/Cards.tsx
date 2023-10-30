import { Component } from 'react';
import { PotionsResponse } from '../../api/types/potions';
import './cards.scss';
import CardPotion from './CardPotion/CardPotion';
interface IState {}

interface IProps {
  data: PotionsResponse['data'];
}

export default class Cards extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className="cards">
        {this.props.data.map((el, index) => (
          <div className="cards_item" key={`card_${index}`}>
            <CardPotion cardData={el} />
          </div>
        ))}
      </div>
    );
  }
}
