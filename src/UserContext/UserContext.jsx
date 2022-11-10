import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authUsers, fetchUsers, getPosts } from "../../api/axiosFetch";

export const UserContext = createContext({});

const UserContextProvider = ({children}) => {
   const navigate = useNavigate();
   const loggedInUser = JSON.parse(localStorage.getItem('isLoggedIn')) || {};
   const [newPosts, setNewPosts] = useState({});
   const [searchResults, setSearchResults] = useState([]);
   const [search, setSearch] = useState('');
   const [getUsers, setGetUsers] = useState([]);
   const [reveal, setReveal] = useState(false);
   const [leftBar, setLeftBar] = useState(false);
   const [reload, setReload] = useState(1);
   const [followed, setFollowed] = useState(null);
   const [rightBar, setRightBar] = useState(true);
   const [getComment, setGetComment] = useState([]);

   
   useEffect(() => {
      const allUsers = async() => {
         try{
            const res = await fetchUsers()
            setGetUsers(res.data)
         }
         catch(error){
            console.log(error)
         }
      }
      allUsers()
      
   }, [reveal])
 
   
   useEffect(() => {
      const filteredSearch = getUsers.filter(users => (
         (users?.username).toLowerCase().includes(search.toLowerCase()) || (users?.email).toLowerCase().includes(search.toLowerCase())
      ))
      setSearchResults(filteredSearch)
   }, [search])


   const handleFollow = async(userId) => {
    try{
        followed ? await fetchUsers.put(`/${loggedInUser?._id}/unfollow`, {id: userId}) : await fetchUsers.put(`/${loggedInUser?._id}/follow`, {id: userId});
        setFollowed(prev => !prev)
        
        const res = await fetchUsers(`/query?userId=${loggedInUser?._id}`)
         setReload(prev => prev + 1)
        await localStorage.removeItem('isLoggedIn')
        await JSON.stringify(localStorage.setItem('isLoggedIn', JSON.stringify(res?.data)))
    }
    catch(error){
      console.log(error)
    }
  }

   const handleLogout = async() => {
      try{
         await authUsers.get('/logout')
         localStorage.removeItem('isLoggedIn')
         navigate('/login')
      }catch(error){
         console.log(error)
      }
   }

   const value = {
      handleLogout, loggedInUser, newPosts, setNewPosts, searchResults, setSearchResults, search, setSearch, reveal, setReveal, followed, setFollowed, handleFollow, reload, leftBar, setLeftBar, rightBar, setRightBar, setGetComment, getComment
   }

   return (
      <UserContext.Provider value={ value }>
         {children}
      </UserContext.Provider>
   )
}

export default UserContextProvider;