import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCart } from '../../../../store/slices/cart.slice'
import getConfig from '../../../../utils/getConfig'
import './styles/cartItem.css'

const CartItem = ({ item }) => {

    const token = localStorage.getItem('token')
    const products = useSelector(state => state.products)
    const [counter, setCounter] = useState(item.productsInCart.quantity)
    const dispatch = useDispatch()

    const updateQuantity = (itemId, newQuantity) => {
        axios.patch(`https://e-commerce-api.academlo.tech/api/v1/cart`, {
          id: itemId,
          newQuantity
        },getConfig(), {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        })
          .then(response => {
            setCounter(newQuantity)
          })
          .catch(error => {
            console.log(error)
          })
      }
      

    const handleImg = e => {
        const img = products?.find(p => {
            if (p.id == e.id) {
                return p.productImgs[0]
            }
        })
        return img.productImgs[0]
    }

    const handleDelete = () => {
        const URL = `https://e-commerce-api.academlo.tech/api/v1/cart/${item.id}`
        axios.delete(URL, getConfig())
            .then(() => dispatch(getUserCart()))
            .catch(err => console.log(err))
    }

    const url = (handleImg(item))

    return (
        <li>
            <article className='cart__card'>
                <div className='cart__box'>
                    <img src={url} className='cart__img' />
                </div>
                <div className='cart__details'>
                    <h3 className='cart__title'>
                        {item.title}
                        <span className='cart__price'>{item.price}</span>
                    </h3>
                    <div className='cart__amount'>
                        <div className='cart__amount__box'>
                            <p onClick={() => updateQuantity(item.id, counter > 0 ? counter - 1 : '')} className="cart__minus">-</p>
                            <span className='cart__quantity' >{counter}</span>
                            <p onClick={() => updateQuantity(item.id, counter + 1)} className="cart__plus ">+</p>
                        </div>
                        <i onClick={handleDelete} className="cart__delete-item fa-regular fa-trash-can"></i>
                    </div>
                    <span className='cart__subtotal'>
                        <span className='cart__subtotal-price'>{item.price * item.productsInCart.quantity}</span>
                    </span>
                </div>
            </article>
        </li>)
}

export default CartItem