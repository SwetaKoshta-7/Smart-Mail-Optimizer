function Login() {
  const login = () => {
    window.location.href = "http://localhost:8000/auth/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-xl p-10 w-96 text-center">

        <h1 className="text-3xl font-bold mb-8">
          Smart Mail Optimizer
        </h1>

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Continue with Google
        </button>

      </div>

    </div>
  );
}

export default Login;