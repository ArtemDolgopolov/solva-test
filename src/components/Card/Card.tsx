import classes from './Card.module.scss'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { fetchCharacters } from '../../features/apiSlice';
import { RootState } from '../../store';
import { useAppDispatch } from '../../hooks/appHooks';
import Pagination from '../Pagination/Pagination';

export default function Card() {
  const dispatch = useAppDispatch();
  const { characters, isLoading, error, currentPage } = useSelector(
    (state: RootState) => state.api
  );

  useEffect(() => {
    dispatch(fetchCharacters(currentPage));
  }, [dispatch]);

  if (isLoading) return <Loader />
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className={classes.card_wrapper}>
      {characters.map((character, index) => (
        <div key={index} className={classes.card}>
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${character.url.match(/\/(\d+)\/$/)?.[1]}.jpg`} // regexp for withdrawing id of each character
            alt={character.name}
            className={classes.card_image} />
            <div className={classes.card_name}>{character.name}</div>
         </div>
       ))}
      </div>
      <Pagination />
  </>
  );
}