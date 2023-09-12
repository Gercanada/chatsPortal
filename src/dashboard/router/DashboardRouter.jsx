import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from '../pages';

import { ProfileDetails } from '../pages/accountPage/ProfileDetails';
import { ProfilePage } from '../pages/accountPage/ProfilePage';
import ChatView from '../pages/chat/ChatView';
import UsersPage from '../pages/users/UsersPage';
import ContactsPage from '../pages/contacts/ContactsPage';

export const DashboardRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardPage />} />
      <Route path='/profile' element={<ProfileDetails />}>
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
      <Route path='/chat'>
        <Route path='/chat/:id/:thread/:prefix' element={<ChatView />} />
      </Route>
      <Route path='/users' element={<UsersPage />} />
      <Route path='/contacts' element={<ContactsPage />} />
      <Route path='/*' element={<DashboardPage />} />
    </Routes>
  );
};
