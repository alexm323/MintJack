import React,{useState,useEffect,useCallback, useContext} from 'react'
import { UserContext } from '../Context/UserContext'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Game from './Game'

const styles ={
  hero:{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: `100%`,
      padding: '1.777rem'
  },
  landing: {
      // backgroundColor: `rgba(242,240,231, 1)`,
      backgroundColor: `aliceblue`,
      display: `flex`,
      flexDirection: `row`,
      flexFlow: 'row wrap',
  },
  marginTop: {
      marginTop: '1.777rem'
  },
  form:{
      backgroundColor: `aliceblue`,
      width: `70%`,
      padding: '4.209rem',
      borderRadius: '1rem',
  },
  nav:{
      padding: '1.777rem',
      width: '100%',
      position: 'fixed',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: `aliceblue`,
  }
}

// fetch the deck and pass it down as a prop to the game component
const BlackjackTable = () => {
    const [deckId,setDeckId] = useState('')

    const {loggedInUserContext, setLoggedInUserContext} = useContext(UserContext)

    const fetchDeck = useCallback(async() => {
      let res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      setDeckId(res.data.deck_id)
      
    },[]) 
  
    useEffect(() => {
      axios.get('http://localhost:3000/loggedInUser')
      .then(res => {
          console.log(res.data)
          if(Object.keys(res.data).length > 0){
              setLoggedInUserContext(true)
          }
      })
      fetchDeck()
    },[fetchDeck])

    const logout = () =>{
      axios.get('http://localhost:3000/logout')
      .then(res => {
        setLoggedInUserContext(false)
      })
    }
    
    // if(loggedInUserContext){
      return (
        <div style={styles.landing}>
          <nav style={styles.nav}>
            <Link to='/home'>
                <h1 className='headerLink2'>MintJack</h1>
            </Link>
            <button onClick={logout} className='navBtns'>Log out</button>
          </nav>
          <div style={styles.hero}>
          <Game deckId={deckId}/>
          </div>
        </div>
      )
    // } else{
    //   return(
    //     <Redirect to='/' />
    //   )
    // }

    
}
export default BlackjackTable;
