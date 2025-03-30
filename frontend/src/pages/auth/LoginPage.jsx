import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { PawPrint } from "lucide-react";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginUser(email, password);
      console.log("Login successful");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(`Error during login: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center px-4 bg-gradient-to-br from-orange-400 to-orange-500 animate-gradient">
      {/* Floating Pet Icons */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute ${
              i % 2 === 0 ? "text-orange-200" : "text-orange-300"
            } text-4xl animate-float`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {i % 2 === 0 ? "🐶" : "🐱"}
          </div>
        ))}
      </div>

      
      <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-xl p-8 w-full max-w-md border border-white/30 transform transition-transform hover:scale-105 relative z-10">
        <div className="flex items-center justify-center mb-6 space-x-3">
          <PawPrint color="#f1603b" width={30} height={30} />
          <h1 className="text-4xl font-bold text-white">Pawnest Login</h1>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-white mb-2">Email</label>
            <div className="flex items-center border border-white/40 rounded-lg px-3 py-2 bg-white/10 hover:bg-white/20 transition-all duration-300 focus-within:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-white opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="grow bg-transparent outline-none placeholder-white/50 text-white pl-3"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-white mb-2">Password</label>
            <div className="flex items-center border border-white/40 rounded-lg px-3 py-2 bg-white/10 hover:bg-white/20 transition-all duration-300 focus-within:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-white opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="grow bg-transparent outline-none placeholder-white/50 text-white pl-3"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Submit Button & Register Link */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-orange-600 active:bg-orange-700 transition-colors shadow-lg hover:shadow-xl relative overflow-hidden"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  Login
                  <span className="absolute -right-4 top-0 text-2xl animate-wag">
                    🐾
                  </span>
                </>
              )}
            </button>
            <Link
              to="/register"
              className="text-white underline text-sm hover:text-orange-200 transition-colors"
            >
              Don't have an account? Register
            </Link>
          </div>
        </form>

        
        <div className="mt-8 text-center">
          <p className="text-white/80 text-sm">
            Join <span className="font-semibold">Pawnest</span> today and find
            your perfect furry companion! 🐾
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
