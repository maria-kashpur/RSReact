import { Component } from 'react';
import { Potion } from '../../../api/types/potions';
import './cardPotion.scss';

interface IProps {
  card: Potion;
}

export default class CardPotion extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className="potion_card">
        <div className="potion_card__ico">
          <img
            src={
              this.props.card.attributes.image ||
              '3808217_cauldron_halloween_pot_potion_witch_icon (1).svg'
            }
            alt="potion"
          />
        </div>
        <div className="potion_card__description">
          <h3>{this.props.card.attributes.name}</h3>
          {this.props.card.attributes.difficulty ? (
            <div className="potion_card__difficulty">
              difficulty: {this.props.card.attributes.difficulty}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}
