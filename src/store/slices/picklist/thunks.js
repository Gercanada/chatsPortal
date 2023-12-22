import { immcaseApi } from "../../../api";
import { setCategoryLabel } from "./picklistSlice";

export const getLabelCateogory = () => {
    return async (dispatch) => {
       //dispatch(setLoading(true));
      try {
        const { data } = await immcaseApi.get(`/whatsapp/threads/categories`);
        const selectOptions = data?.data?.map((i) => ({ value:  i.id, label:i.name,color:i.color }));
        await dispatch(setCategoryLabel(selectOptions));
      } catch (error) {
        console.error(error);
      }finally {
        //dispatch(setLoading(false));
      }
    };
  };
