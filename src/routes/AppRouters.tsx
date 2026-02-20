import { Route, Routes } from "react-router-dom";

import FruitOne from '../pages/FruitOne'
import FruitList from '../pages/FruitList';
import HomePage from './../pages/HomePage';
import LoginPage from "./../pages/LoginPage";
import type { User } from "../types/User";
import SignupPage from './../pages/SignupPage';
import ProductList from './../pages/ProductList';
import ProductInsertForm from './../pages/ProductInsertForm';
import ProductUpdateForm from './../pages/ProductUpdateForm';
import ProductDetail from './../pages/ProductDetail';

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

         <Route path='/product/list' element={<ProductList user={user} />} />
         <Route path='/product/insert' element={<ProductInsertForm user={user} />} />

         {/* 기호 ":id"는 변수처럼 동작하는 매개 변수이고, ProductUpdateForm.js 파일에서 참조합니다. */}
         <Route path='/product/update/:id' element={<ProductUpdateForm user={user} />} />
         <Route path='/product/detail/:id' element={<ProductDetail user={user} />} />

      </Routes>
   );
}

export default App;
