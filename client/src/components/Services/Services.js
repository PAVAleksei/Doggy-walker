// import dogMainPage from '../../../public/assets'
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

function Services() {

  const history = useHistory();

  const addOrderHandler = () => {

    history.push('/order');
  }


  return (
    <div>
      <h3>Услуги</h3>
      {/* <img src={ dogMainPage }></img> */}
      <Button onClick={ addOrderHandler }>Заказать выгул</Button>
    </div>
  );
}

export default Services;
