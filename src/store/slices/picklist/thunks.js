import { immcaseApi } from "../../../api";
import { setCategoryLabel } from "./picklistSlice";

export const getLabelCateogory = () => {
    return async (dispatch) => {
       //dispatch(setLoading(true));
      try {
        const { data } = await immcaseApi.get(`/whatsapp/threads/categories`);
        console.log("dataaa",data)
        await dispatch(setCategoryLabel(data.data));
      } catch (error) {
        console.error(error);
      }finally {
        //dispatch(setLoading(false));
      }
    };
  };
