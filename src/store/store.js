import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth';
import { documentsSlice } from './slices/documents';
import { modalSearchSlice } from './slices/modalSearch/modalSearchSlice';
import { uiSlice } from './slices/ui';
import { usersSlice } from './slices/users';
import { contactsSlice } from './slices/contacts';
import { casesSlice } from './slices/cases';
import { detailFieldHelperSlice } from './slices/detailFieldHelper';
import { checklistsSlice } from './slices/checklists';
import { optionsReferenceSlice } from './slices/optionsReference';
import { itemsSlice } from './slices/items';
import { CommentsSlice } from './slices/form/commentsSlice';
import { navBarSlice } from './slices/navbar';
import { paginationSlice } from './slices/pagination';
import { selectSlice } from './slices/selectsInputs/selectSlice';
import { dashboardSlice } from './slices/dashboard/dashboardSlice';
import { immvisasItemsSlice } from './slices/immvisas/items/immvisasItemsSlice';
import { immvisasCasesSlice } from './slices/immvisas/cases/immvisasCasesSlice';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    documents: documentsSlice.reducer,
    users: usersSlice.reducer,
    contacts: contactsSlice.reducer,
    modalSearch: modalSearchSlice.reducer,
    cases: casesSlice.reducer,
    detailFieldHelper: detailFieldHelperSlice.reducer,
    checklists: checklistsSlice.reducer,
    items: itemsSlice.reducer,
    optionsReference: optionsReferenceSlice.reducer,
    comments: CommentsSlice.reducer,
    navBarInfo: navBarSlice.reducer,
    pagination: paginationSlice.reducer,
    selectInputs: selectSlice.reducer,
    dashboard: dashboardSlice.reducer,
    // IMMVISAS
    immvisasItems: immvisasItemsSlice.reducer,
    immvisasCases:immvisasCasesSlice.reducer
  
  },
});
