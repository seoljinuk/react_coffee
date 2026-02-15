import { Route, Routes } from "react-router-dom";

import FruitOne from '../pages/FruitOne'
import FruitList from '../pages/FruitList';
import HomePage from './../pages/HomePage';
import LoginPage from "./../pages/LoginPage";
import type { User } from "../types/User";
import SignupPage from './../pages/SignupPage';


type AppRoutersProps = {
   user: User | null;
   handleLoginSuccess: (userData: User) => void;
};

function App({ user, handleLoginSuccess }: AppRoutersProps) {
   return (
      <Routes>
         {/* path 프롭스는 요청 정보 url, element 프롭스는 컴포넌트 이름 */}
         <Route path='/fruit' element={<FruitOne />} />
         <Route path='/fruit/list' element={<FruitList />} />
         <Route path='/' element={<HomePage />} />
         <Route path='/member/login' element={< LoginPage setUser={handleLoginSuccess} />} />
         <Route path='/member/signup' element={<SignupPage />} />
      </Routes>
   );
}

export default App;
