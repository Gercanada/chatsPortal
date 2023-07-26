import { immcaseApi } from "../../../api";
import { setAssignedTo, setTicketId, setTypeId } from "./selectSlice";



export const getTypeIdSelects = () => {
    return async (dispatch) => {
      //dispatch(setLoading(true));
      try {
        const { data } = await immcaseApi.get(`/resource/checklists/types/select`);
        await dispatch(setTypeId(data.types));
      } catch (error) {
        console.error(error);
      }
      //dispatch(setLoading(false));
    };
  }
export const getTicketIdSelect = () => {
    return async (dispatch) => {
      //dispatch(setLoading(true));
      try {
        const { data } = await immcaseApi.get(`/resource/tickets/select`);
        await dispatch(setTicketId(data.cases));
      } catch (error) {
        console.error(error);
      }
      //dispatch(setLoading(false));
    };
  }
export const getAssignedIdSelect = () => {
    return async (dispatch) => {
      //dispatch(setLoading(true));
      try {
        const { data } = await immcaseApi.get(`/resource/users/select`);
        await dispatch(setAssignedTo(data.users));
      } catch (error) {
        console.error(error);
      }
      //dispatch(setLoading(false));
    };
  }