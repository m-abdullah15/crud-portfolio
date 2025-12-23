import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const usersKey = 'portfolio_users';
  const loadUsers = () => {
    try {
      const raw = localStorage.getItem(usersKey);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  };

  const saveUsers = (users) => {
    localStorage.setItem(usersKey, JSON.stringify(users));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const users = loadUsers();
    if (users.find(u => u.email === email)) {
      alert('User with this email already exists');
      return;
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    saveUsers(users);
    localStorage.setItem('auth_token', JSON.stringify({ id: newUser.id, email: newUser.email }));
    navigate('/admin');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = loadUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      alert('Invalid credentials');
      return;
    }
    localStorage.setItem('auth_token', JSON.stringify({ id: user.id, email: user.email }));
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
              <input required value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2" />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2" />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{isLogin ? 'Login' : 'Sign Up'}</button>
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-sm text-blue-600">{isLogin ? 'Create an account' : 'Have an account? Login'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Auth;