function Login(){
    return (
        <div className="bg-white text-slate-800 w-full max-w-md rounded-xl shadow-lg p-6">
        <h2 className="text-3xl  text-center font-semibold mb-4">Login</h2>

        <label className="block mb-3">
          <span className="text-sm text-slate-600">Username</span>
          <input className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" type="text" placeholder="username" />
        </label>

        <label className="block mb-3">
          <span className="text-sm text-slate-600">Password</span>
          <input className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" type="password" placeholder="password" />
        </label>

        <button className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">Sign in</button>
      </div>
    )
}

export default Login;