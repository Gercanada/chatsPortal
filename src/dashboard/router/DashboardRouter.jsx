import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage, CasesPage, NotFoundPage, ChecklistPage } from '../pages';

import { Testing } from '../pages/immigration/cases/Testing';
import { CaseDetails } from '../pages/immigration/cases/CaseDetails';
import { Summary } from '../components';

import { Summary2 } from '../components/Summary2';
import { CaseDetails2 } from '../pages/immigration/cases/CaseDetails2';
import { CheckPendingItems } from '../pages/immigration/checklists/CheckPendingItems';
import CaseCompleteChecks from '../pages/immigration/cases/CaseCompleteChecks';
import CasePendingChecks from '../pages/immigration/cases/CasePendingChecks';

import { ProfileDetails } from '../pages/accountPage/ProfileDetails';
import { ProfilePage } from '../pages/accountPage/ProfilePage';
import ChangePassword from '../pages/accountPage/ChangePassword';
import CheckListEforms from '../pages/immigration/checklists/CheckListEforms';

export const DashboardRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardPage />} />
      {/* <Route path='/account' element={<DashboardPage />} /> */}
      <Route path='/testing' element={<Testing />} />

      <Route path='/profile' element={<ProfileDetails />}>
        <Route path='/profile' element={<ProfilePage />} />
        {/* <Route path='/profile/password' element={<ChangePassword />} /> */}
      </Route>

      <Route path='/cases'>
        <Route path='/cases' element={<CasesPage />} /> {/* Cases */}
        <Route path='/cases/:id' element={<CaseDetails2 />}>
          <Route path='/cases/:id/active' element={<Summary2 />} />
          <Route path='/cases/:id/active/completedcases' element={<CaseCompleteChecks />} />
          <Route path='/cases/:id/active/pendingcases' element={<CasePendingChecks />} />
          <Route path='/cases/:id/*' element={<NotFoundPage />} />
        </Route>
        <Route path='/cases' element={<NotFoundPage />} />
        <Route path='/cases/*' element={<NotFoundPage />} />
        {/* redirect to 404  */}
      </Route>

      <Route path='/checklist'>
        <Route path='/checklist' element={<ChecklistPage />} /> {/* Cases */}
        <Route path='/checklist/:id' element={<CaseDetails />}>
          <Route path='/checklist/:id/active' element={<Summary />} />
          <Route path='/checklist/:id/active/items' element={<CheckPendingItems />} />
          <Route path='/checklist/:id/active/eforms' element={<CheckListEforms />} />
          <Route path='/checklist/:id/*' element={<NotFoundPage />} />
        </Route>
        <Route path='/checklist' element={<NotFoundPage />} />
        <Route path='/checklist/*' element={<NotFoundPage />} />
        {/* redirect to 404  */}
      </Route>

      <Route path='/*' element={<DashboardPage />} />
      {/* any */}
    </Routes>
  );
};
