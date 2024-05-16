import React from 'react'
import { UsersLogin } from './components/loginPage-main';
import { HeaderMenuNav } from './components/headerMenu';

export const Login: React.FC = () => {
  return (
    <div className="bg-slate-800">
      <HeaderMenuNav/>
      <UsersLogin/>
    </div>
  );
};