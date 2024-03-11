import { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css';
import { addToLS, getStoredCart } from "../../utilities/localStorage";
import Cart from "../Cart/Cart";
const Bottles = () => {

    const [bottles, setBottles]= useState([]);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        fetch('bottle.json')
        .then(res => res.json())
        .then(data => setBottles(data))
    },[])

    // load cart from local storage
    useEffect(()=>{
        console.log(bottles.length)
        if(bottles.length){
            const storedCart= getStoredCart();
            const savedCart =[];
            console.log(storedCart);
            for( const id of storedCart){
                console.log(id);
                const bottle = bottles.find(bottle => bottle.id === id);
                
                if(bottle){
                    savedCart.push(bottle)
                }
            }
            console.log('savedCart',savedCart)
            setCart(savedCart);
        }
    },[bottles])

    const handleAddToCart = bottle =>{
        const newCart = [...cart, bottle];
        setCart(newCart);
        addToLS(bottle.id);
    }

    return (
        <div>
            <h2>Bottles here: {bottles.length}</h2>
            <Cart cart={cart}></Cart>
            <div className="bottle-container">
            {
                bottles.map(bottle => <Bottle key={bottle.id} handleAddToCart={handleAddToCart} bottle={bottle}></Bottle>)
            }
            </div>
        </div>
    );
};

export default Bottles;