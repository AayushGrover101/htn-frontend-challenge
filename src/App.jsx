import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './contexts/SearchContext';
import { FilterProvider } from './contexts/FilterContext';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './components/HomePage';

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <FilterProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Router>
        </FilterProvider>
      </SearchProvider>
    </AuthProvider>
  )
}

export default App
