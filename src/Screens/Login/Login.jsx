import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import stripeImg1 from '../../assets/stripe1.png';
import stripeImg2 from '../../assets/stripe2.png';
import stripeImg3 from '../../assets/stripe3.jpg';
import { apiCalling } from "../../apiService/apiCalling";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";


export default function Login() {

    const images = [stripeImg1, stripeImg2, stripeImg3];
    const [imageIndex, setImageIndex] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    //  Add state for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex(prev => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval); // cleanup
    }, []);


    // Update function to use event.preventDefault
    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const data = await apiCalling({
                url: '/Login',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: { email, password }
            });

            dispatch(setAuthData({
                token: data.token,
                remember: true
            }));
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
        }
    };


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
                        <form className="text-start" onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label text-black">Email address</label>
                                <input
                                    required
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label text-black">Password</label>
                                <input
                                    required
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-light w-100 bg-success">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
