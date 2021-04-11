import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import moment from 'moment';
import { editOrderSaga } from '../../redux/actionCreators/orderAC';
export default function EditOrder() {
  const formRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const order = useSelector(state => state.order);
  const address = order.deliveryAddress.split(', ');
  const submitHandler = (e) => {
    e.preventDefault();
    const valuesOfFields = Object.fromEntries(new FormData(formRef.current).entries());
    if (Object.keys(valuesOfFields).every(key => valuesOfFields[key].trim())) {
      dispatch(editOrderSaga(valuesOfFields, order._id));
      formRef.current.reset();
      history.push(`/orders/${order._id}`);
    }
  }
  const deliveryDate = moment(new Date(order.deliveryDate)).format('YYYY-MM-DD');
  const assemblyDate = moment(new Date(order.assemblyDate)).format('YYYY-MM-DD');
  return (
    <>
      <div className="container d-flex justify-content-center aling-items-center">
        Редактирование заказа
      </div>
      <div className="container-fluid d-flex justify-content-center aling-items-center vh-100">
        <form ref={formRef} onSubmit={submitHandler} name="addNewOrderForm">
          <div className="mb-3">
            <input placeholder="Название заказа" defaultValue={order.title} type="text" name="title" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Номер договора" defaultValue={order.contractNumber} type="text" name="contractNumber" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Город" defaultValue={address[0]} type="text" name="city" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Улица" defaultValue={address[1]} type="text" name="street" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Дом/строение" defaultValue={address[2]} type="text" name="building" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Квартира/помещение" defaultValue={address[3]} type="text" name="room" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Дата доставки" defaultValue={deliveryDate} type="date" name="deliveryDate" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Дата сборки" defaultValue={assemblyDate} type="date" name="assemblyDate" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Стоимость заказа" defaultValue={order.orderPrice} type="number" name="orderPrice" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Оплачено" defaultValue={order.payment} type="number" name="payment" className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Стоимость доставки" defaultValue={order.deliveryPrice} type="number" name="deliveryPrice" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Стоимость сборки" defaultValue={order.assemblyPrice} type="number" name="assemblyPrice" required className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Редактировать</button>
        </form>
      </div>
    </>
  )
}
