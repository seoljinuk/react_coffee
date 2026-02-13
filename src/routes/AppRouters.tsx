import { Route, Routes } from "react-router-dom";

import FruitOne from '../pages/FruitOne'
import FruitList from '../pages/FruitList';
import HomePage from './../pages/HomePage';

function App() {
   return (
      <Routes>
         {/* path 프롭스는 요청 정보 url, element 프롭스는 컴포넌트 이름 */}
         <Route path='/fruit' element={<FruitOne />} />
         <Route path='/fruit/list' element={<FruitList />} />
         <Route path='/' element={<HomePage />} />

      </Routes>
   );
}

export default App;
