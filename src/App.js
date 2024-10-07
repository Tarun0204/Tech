import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CourseList from './components/CourseList'
import NotFound from './components/NotFound'
import CourseItemDetails from './components/CourseItemDetails'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<CourseList />} />
      <Route path="/courses/:id" element={<CourseItemDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default App
