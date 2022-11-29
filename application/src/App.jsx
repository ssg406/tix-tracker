import { Register, ProtectedRoute, Error, Landing } from './pages';
import { SharedLayout, Profile, Dashboard, NewTicket } from './pages/internal';
import { AppContextProvider } from './context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path='profile' element={<Profile />} />
            <Route path='new-ticket' element={<NewTicket />} />
          </Route>
          <Route path='register' element={<Register />} />
          <Route path='landing' element={<Landing />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
};

export default App;
