import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import stripeImg1 from '../../Assets/stripe1.png';
import stripeImg2 from '../../Assets/stripe2.png';
import stripeImg3 from '../../Assets/stripe3.jpg';

export default function Login() {
    const images = [stripeImg1, stripeImg2, stripeImg3];
    const [imageIndex, setImageIndex] = useState(0);

    // Change image every 60 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex(prev => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval); // cleanup
    }, []);

    return (
        <div className="container-fluid vh-100">
            <div className="row h-100">

                {/* Left Side: Background Image */}
                <div className="col-md-6 d-none d-md-block p-0">
                    <div
                        className="w-100 h-100"
                        style={{
                            backgroundImage: `url(${images[imageIndex]})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            transition: "background-image 0.5s ease-in-out"
                        }}
                    ></div>
                </div>

                {/* Right Side: Login Form */}
                <div className="col-md-6 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'lightgreen' }}>
                    <div className="w-50">
                        <h2 className="mb-4 text-black">Login</h2>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label text-black">Email address</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter email" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label text-black">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-light w-100 bg-success">Login</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
