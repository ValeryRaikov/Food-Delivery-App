import { assets } from '../../../assets/assets';
import './OrderItem.css';

export default function OrderItem({ 
    idx, 
    items,
    amount,
    status,
    fetchOrders,
}) {
    return (
        <div className="order-item">
            <img src={assets} />
            <p>{items.map(item => {
                if (idx === items.length - 1) {
                    return item.name + ' x ' + item.quantity;
                } else {
                    return item.name + ' x ' + item.quantity + ',\n';
                }
            })}
            </p>
            <p>${amount}.00</p>
            <p>Items: {items.length}</p>
            <p><span>&#x25cf;</span> <b>{status}</b></p>
            <button onClick={fetchOrders}>Track Order</button>
        </div>
    );
}