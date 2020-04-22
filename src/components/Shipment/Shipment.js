import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../LogIn/useAuth';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm()
    const onSubmit = data => { console.log(data) }
    const auth = useAuth()



    return (

        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <h3><span style={{ color: "red" }}>{auth.user.name}</span>, you are requested to submit the information for the shipment. Thank you!</h3>
            <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Enter your name" />
            {errors.name && <span className="error">Name is required</span>}
            <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Enter your email" />
            {errors.email && <span className="error">Email is required</span>}
            <input name="address1" ref={register({ required: true })} placeholder="Enter your Address 1" />
            {errors.address1 && <span className="error">Address 1 is required</span>}
            <input name="address2" ref={register({ required: true })} placeholder="Enter your Address 2" />
            {errors.address2 && <span className="error">Address 2 is required</span>}
            <input name="city" ref={register({ required: true })} placeholder="Enter your city" />
            {errors.city && <span className="error">City is required</span>}
            <input name="country" ref={register({ required: true })} placeholder="Enter your country" />
            {errors.country && <span className="error">Country is required</span>}
            <input name="phone" ref={register({ required: true })} placeholder="Enter your phone number" />
            {errors.phone && <span className="error">Phone No. is required</span>}
            <input name="zipCode" ref={register({ required: true })} placeholder="Enter Zip Code" />
            {errors.zipCode && <span className="error">Zip Code is required</span>}
            <input className="form-submit-button" type="submit" />
        </form>
    )
};

export default Shipment;