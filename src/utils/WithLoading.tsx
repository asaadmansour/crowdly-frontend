// utils/withLoading.js
import { showLoading, hideLoading } from '../store/slices/uiSlicer.js';
import toast from 'react-hot-toast';

const withLoading = (thunkFn) => async (dispatch, getState) => {
  dispatch(showLoading());
  try {
    return await thunkFn(dispatch, getState);
  } catch (err) {
    toast.error(err.message);
    throw err;
  } finally {
    dispatch(hideLoading());
  }
};

export default withLoading;
