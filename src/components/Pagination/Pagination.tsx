import classes from './Pagination.module.scss'
import { useSelector } from 'react-redux'
import { fetchCharacters, setCurrentPage } from '../../features/apiSlice'
import { useAppDispatch } from '../../hooks/appHooks'
import { RootState } from '../../store'

export default function Pagination() {
  const dispatch = useAppDispatch();
  const { currentPage, totalPages } = useSelector((state: RootState) => state.api);

  const handlePrevPage = (currentPage: number) => {
   if (currentPage !== 1) {
    dispatch(setCurrentPage(currentPage - 1));
    dispatch(fetchCharacters(currentPage - 1));
   }   
  };

  const handleNextPage = (currentPage: number) => {
   if (currentPage < totalPages) {
    dispatch(setCurrentPage(currentPage + 1));
    dispatch(fetchCharacters(currentPage + 1));
   }   
  };

  return (
    <div className={classes.pagination_wrapper}>
      <button 
        onClick={() => handlePrevPage(currentPage)} 
        disabled={currentPage === 1}
        className={classes.pagination_button_prev}>
         Prev
      </button>
      <span className={classes.pagination_span}>Page {currentPage} of {totalPages}</span>
      <button 
        onClick={() => handleNextPage(currentPage)} 
        disabled={currentPage >= totalPages}>
        Next
      </button>
    </div>
  );
}