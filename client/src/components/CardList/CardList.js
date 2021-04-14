import { Box, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../redux/actionCreators/errorAC";
import {
  changeOrderStatusRequested,
  setOrders,
} from "../../redux/actionCreators/orderAc";
import ExecutorCardOrder from "../ExecutorCardOrder/ExecutorCardOrder";

function CardList() {
  const allOrders = useSelector((state) => state.allOrders);
  const dispatch = useDispatch();

  return (
    <Box m={3}>
      <Grid item container spacing={2} direction="row">
        {allOrders?.length ? (
          allOrders.map((order) => (
            <Grid item xs={12} sm={3}>
              <ExecutorCardOrder
                key={order._id}
                id={order._id}
                description={order.description}
                date={order.date}
                price={order.price}
                address={order.address.name}
                requested={order.requested}
                dogId={order.dogId}
              />
            </Grid>
          ))
        ) : (
          <p>Нет заказов</p>
        )}
      </Grid>
    </Box>
  );
}

export default CardList;
