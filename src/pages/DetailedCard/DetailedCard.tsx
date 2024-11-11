import classes from './DetailedCard.module.scss'
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "../../store"
import { useEffect, useState } from 'react'
import { fetchCharacterById } from '../../features/apiSlice'
import { useAppDispatch } from '../../hooks/appHooks'
import Loader from '../../components/Loader/Loader'
import { useForm } from 'react-hook-form'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../../services/firebaseAuth'

interface CharacterData {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  birth_year: string;
  gender: string;
  url: string
}

interface CharacterForm {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  birth_year: string;
  gender: string
}

export default function DetailedCard() {
  const { characters, characterDetails, isLoading } = useSelector(
    (state: RootState) => state.api
  );
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const { register, handleSubmit, reset } = useForm<CharacterForm>()
  const [user, setUser] = useState<User | null>(null)
  const [isFetching, setIsFetching] = useState(true)

  const thisCard = characters.find((character: CharacterData) => character.url.match(/\/(\d+)\/$/)?.[1] === id)

  const saveToLocalStorage = (data: CharacterData, user: User) => {
   if (user) {
     localStorage.setItem(`character-${id}-${user.email}`, JSON.stringify(data))
   }
  }

  const loadFromLocalStorage = (user: User): CharacterData | null => {
    if (user) {
      const storedData = localStorage.getItem(`character-${id}-${user.email}`);
      return storedData ? JSON.parse(storedData) : null
    }
    return null;
  };

  const [characterData, setCharacterData] = useState<CharacterData | null>(null)

  useEffect(() => {
   const subscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
      const storedData = loadFromLocalStorage(user)
      if (storedData) {
        setCharacterData(storedData)
      }
    } else {
       setUser(null)
    }
   })

   return () => subscribe()
  }, [dispatch])

  useEffect(() => {
   if (!thisCard) {
    dispatch(fetchCharacterById(id!))
   }
  }, [dispatch, id, thisCard])
  
  useEffect(() => {
    const storedData = user ? loadFromLocalStorage(user) : null
    setCharacterData(storedData || thisCard || characterDetails)
    setIsFetching(false)
  }, [thisCard, characterDetails, user]);

  if (isLoading || isFetching) return <Loader />
  if (!characterData) return <p>Character not found</p>

  const onSubmit = (data: CharacterForm) => {
   const updatedData = { ...characterData, ...data };
   setCharacterData(updatedData);
   if (user) {
     saveToLocalStorage(updatedData, user); 
   }
   setIsEditing(false);
 };

 const handleEdit = () => {
   setIsEditing(true);
   reset(characterData);
 };

  return (
    <>
      <div className={classes.detailed_card}>
        <img
          src={`https://starwars-visualguide.com/assets/img/characters/${characterData.url.match(/\/(\d+)\/$/)?.[1]}.jpg`} // regexp for withdrawing id of each character
          alt={characterData.name}
          className={classes.detailed_card_image} 
        />
       {isEditing ? (
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className={classes.detailed_card_form}
        >
        <label>
          Name:
          <input {...register("name")} defaultValue={characterData.name} />
        </label>
        <label>
          Height:
          <input {...register("height")} defaultValue={characterData.height} />
        </label>
        <label>
          Mass:
          <input {...register("mass")} defaultValue={characterData.mass} />
        </label>
        <label>
          Hair Color:
          <input {...register("hair_color")} defaultValue={characterData.hair_color} />
        </label>
        <label>
          DOB:
          <input {...register("birth_year")} defaultValue={characterData.birth_year} />
        </label>
        <label>
          Gender:
          <input {...register("gender")} defaultValue={characterData.gender} />
        </label>
        <button type="submit">Save</button>
      </form>
       ) : (
        <>
          <div className={classes.detailed_card_info}>
            <p>Name: {characterData.name}</p>
            <p>Height: {characterData.height}</p>
            <p>Weight: {characterData.mass}</p>
            <p>Hair: {characterData.hair_color}</p>
            <p>DOB: {characterData.birth_year}</p>
            <p>Gender: {characterData.gender}</p>
            <button onClick={handleEdit}>Edit</button>
          </div>
        </>
       )}
       
      </div>
    </>
  )
}