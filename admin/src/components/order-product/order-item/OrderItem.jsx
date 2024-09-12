import { assets } from '../../../../../frontend/src/assets/assets';
import './OrderItem.css';

export default function OrderItem({
    _id,
    items,
    address,
    amount,
    status,
    statusHandler,
}) {
    return (
        <div className="order-item">
            <img src={assets.parcel_icon} />
            <div>
                <p className="order-item-food">
                    {items.map((item, idx) => {
                        if (idx === items.length - 1) {
                            return `${item.name} X ${item.quantity}`;
                        } else {
                            return `${item.name} X ${item.quantity}, `;
                        }
                    })}
                </p>
                <p className="order-item-name">{`${address.firstName} ${address.lastName}`}</p>
                <div className="order-item-address">
                    <p>{address.street}</p>
                    <p>{`${address.city}, ${address.state}, ${address.country}, ${address.postalCode}`}</p>
                </div>
                <p className="order-item-phone">{address.phoneNumber}</p>
            </div>
            <p>Items: {items.length}</p>
            <p>${amount}</p>
            <select onChange={(e) => statusHandler(e, _id)} value={status} >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
            </select>
        </div>
    );
}