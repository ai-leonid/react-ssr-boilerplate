import StartPage from '$pages/StartPage';
import {pageTitles} from '$modules/constants';
import getInitialData from '$apiFolder/getInitialData'

const routes =  [
  {
    path: '/',
    exact: true,
    component: StartPage,
    title: pageTitles.startPage,
    getInitialData: () => getInitialData()
  }
];

export default routes
