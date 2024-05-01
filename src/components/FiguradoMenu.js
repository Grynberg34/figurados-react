import { connect } from 'react-redux';
import { GetPalpites } from '../actions';
import { store } from '../store';

function FiguradoMenu(props) {

  let opções = props.opções;

  let figurado = props.figurado;

  let palpites = props.palpites;

  let user = props.user;

  function darPalpite(palpite) {

    if (palpites.erros > 0) {

      store.dispatch(GetPalpites(palpite, figurado, user?.id));
    }

    if (window.innerWidth < 768) {

      console.log(palpites.opções.length)

      if (palpites.opções.length < 3) {
        window.scrollTo({
          top: 400,
          behavior: "smooth",
        });

      } else if (palpites.opções.length >= 3 && palpites.opções.length < 6 ) {
        window.scrollTo({
          top: 800,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
          top: 1200,
          behavior: "smooth",
        });
      }


    }

  }


  return (
    <div className='figurado__dia'>

      <div className='figurado__dia__menu'>

        <h2 className='figurado__dia__menu__title'>clique nas opções abaixo para mais dicas</h2>

        <h5 className='figurado__dia__menu__option'>jogava de...</h5>
      <div className='figurado__dia__menu__items'>

        { opções.posições.map( (posição) => 
          <div key={posição.id} className='figurado__dia__menu__items__item'>
            <img onClick={() => darPalpite(posição)} className='figurado__dia__menu__items__item__img' src={posição.imagem} title={posição.opção} alt="" />
      </div>
      )}

      </div>

      <h5 className='figurado__dia__menu__option'>jogou no...</h5>
      <div className='figurado__dia__menu__items'>

        { opções.times.map( (time) => 
          <div key={time.id} className='figurado__dia__menu__items__item'>
            <img onClick={() => darPalpite(time)} className='figurado__dia__menu__items__item__img'src={time.imagem} title={time.opção} alt=""/>
          </div>
        )}

      </div>


      <h5 className='figurado__dia__menu__option'>ganhou...</h5>
      <div className='figurado__dia__menu__items'>


        { opções.títulos.map( (título) => 
          <div key={título.id} className='figurado__dia__menu__items__item--titulo'>
            <img onClick={() => darPalpite(título)} className='figurado__dia__menu__items__item__img' src={título.imagem} title={título.opção} alt=""/>
          </div>
        )}

      </div>

    </div>

    </div>
  )

  
}

function mapStateToProps(state) {
  return {
    opções: state.opções,
    figurado: state.figurado,
    palpites: state.palpites,
    auth: state.auth,
    user: state.user
  }
}

export default connect(
  mapStateToProps
)(FiguradoMenu);
