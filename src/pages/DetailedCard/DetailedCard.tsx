import classes from './DetailedCard.module.scss'
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "../../store"
import { useEffect } from 'react'
import { fetchCharacterById } from '../../features/apiSlice'
import { useAppDispatch } from '../../hooks/appHooks'
import Loader from '../../components/Loader/Loader'

export default function DetailedCard() {
  const { characters, characterDetails, isLoading } = useSelector(
    (state: RootState) => state.api
  );
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const thisCard = characters.find((character: { url: string }) => character.url.match(/\/(\d+)\/$/)?.[1] === id)

  useEffect(() => {
   if (!thisCard) {
    dispatch(fetchCharacterById(id!))
   }
  }, [dispatch, id, thisCard])

  if (isLoading) return <Loader />

  const character = thisCard || characterDetails

  if (!character) return <p>Character not found</p>

  return (
    <>
      <div className={classes.detailed_card}>
        <img
          src={`https://starwars-visualguide.com/assets/img/characters/${character.url.match(/\/(\d+)\/$/)?.[1]}.jpg`} // regexp for withdrawing id of each character
          alt={character.name}
          className={classes.detailed_card_image} 
        />
       
       <div className={classes.detailed_card_info}>
         <p>Name: {character.name}</p>
         <p>Height: {character.height}</p>
         <p>Weight: {character.mass}</p>
         <p>Hair: {character.hair_color}</p>
         <p>DOB: {character.birth_year}</p>
         <p>Gender: {character.gender}</p>
       </div>
      </div>
    </>
  )
}