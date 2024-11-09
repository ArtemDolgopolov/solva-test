import {
 createBrowserRouter,
 createRoutesFromElements,
 Route,
 RouterProvider,
 Navigate
} from 'react-router-dom';
import { AppContextProvider } from './components/Context/Context'
import PrivateRoute from './utils/PrivateRoute'
import Main from './layouts/Main/Main'
import Auth from './pages/auth/Auth'
import Characters from './pages/Characters/Characters'
import { Provider } from 'react-redux'
import { setupStore } from './store'
import DetailedCard from './pages/DetailedCard/DetailedCard';

const store = setupStore()

const router = createBrowserRouter(
 createRoutesFromElements(
   <Route element={<Main />} path="/">
     <Route index element={<Navigate to="/auth" />} />
     <Route
       path="/characters"
       element={
         <PrivateRoute redirectTo="/auth" isReversedDirection={true}>
           <Characters />
         </PrivateRoute>
       }
     />
     <Route
       path="/characters/:id"
       element={
         <PrivateRoute redirectTo="/auth" isReversedDirection={true}>
           <DetailedCard />
         </PrivateRoute>
       }
     />
     <Route
       path="/auth"
       element={
         <PrivateRoute redirectTo="/characters">
           <Auth />
         </PrivateRoute>
       }
     />
   </Route>
 )
);

export default function App() {
  return (
    <AppContextProvider>
      <Provider store={store}> 
      <RouterProvider router={router} />
      </Provider> 
    </AppContextProvider>
  );
}