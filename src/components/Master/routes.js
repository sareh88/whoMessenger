import SingUp from '../Login/SingUp';
import SingIn from '../Login/SingIn';
import ProfileSettings from '../SettingPage/ProfileSettings';
import App from './App';

export const routesArray = [
  {
    component: SingIn,
    path: '/',
    exact: true,
  },
  {
    component: App,
    path: '/main',
    exact: true,
  },
  {
    component: ProfileSettings,
    path: '/profile',
    exact: false,
  },
  {
    component: SingUp,
    path: '/singup',
    exact: false,
  },
];
