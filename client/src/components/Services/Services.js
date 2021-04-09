// import dogMainPage from '../../../public/assets'
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

function Services() {

  const history = useHistory();

  const addOrderFormHandler = () => {

    history.push('/order');
  }


  return (
    <div>
      <h3>Услуги</h3>
      {/* <img src={ dogMainPage }></img> */}
      <Button onClick={ addOrderFormHandler }>Заказать выгул</Button>
    </div>
  );
}

export default Services;
