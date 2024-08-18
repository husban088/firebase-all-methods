import React, { useEffect, useState } from 'react';
import '../App.css';
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import {auth, provider, providers} from '../firebase'
import googleicon from '../googleicon.svg'
import fbicon from '../facebookicon.svg'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {


  const navigate = useNavigate();

  const googleLogin = () => {
      signInWithPopup(auth, providers).then(async (result) => {
          console.log(result)
          if (result.user) {

              toast("user logged in successfully")
              navigate('/')
          }
      })
  }

  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
          console.log(user);
          setUserDetails(user)

          //   const docRef = doc(db, "Users", user.uid);
          //   const docSnap = await getDoc(docRef);
          //   if (docSnap.exists()) {
          //     setUserDetails(docSnap.data());
          //     console.log(docSnap.data());
          //   } else {
          //     console.log("User is not logged in");
          //   }
      });
  };

  useEffect(() => {
      fetchUserData();
  }, []);

  async function handleLogout() {
      try {
          await auth.signOut();
          // navigate('/')
          console.log("User logged out successfully!");
      } catch (error) {
          console.error("Error logging out:", error.message);
      }
  }


  



  const [user, setUser] = useState(null);
const [profilePicture, setProfilePicture] = useState(null);

const handleFacebookLogin=()=>{
  signInWithPopup(auth, provider).then((result)=>{
    setUser(result.user);
    
    toast("user logged in successfully")
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    // fetch facebook graph api to get user actual profile picture
    fetch(`https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`)
    .then((response)=>response.blob())
    .then((blob)=>{
      setProfilePicture(URL.createObjectURL(blob));
    })
  })
  .catch((err)=>{
    console.log(err);
  })
}

const handleLogouts=()=>{
  setUser(null);
  toast("user logged out successfully")
}



  return (
    <>


        <div className="wrapper">
      <div className='box' style={{marginBottom: "30px"}}>
        {user?(
              <>
                <button className="google-btn fb__btn"
                  onClick={handleLogouts}>
                  LOGOUT
                </button>
                <ToastContainer />
                <div className="user-detail">
                <h3>Welcome {user.displayName}</h3>
                <p>{user.email}</p>
                <div className='photo'>
                  <img src={profilePicture} alt="dp" referrerPolicy='no-referrer' width={"10%"} style={{ borderRadius: "50%", marginBottom: "5rem", marginTop: "2rem", marginRight: "auto", marginLeft: "auto" }}/>
                </div>
                </div>
              </>
            ):(
              <button className="google-btn fb__button"
                onClick={handleFacebookLogin}>
                   <img src={fbicon} alt="googleicon" className="google-icon" /> <ToastContainer />
                   Sign In With Facebook
              </button>
           )} 
      
      </div>
    </div>




{!userDetails &&
                <div className="google-button">
                    <button className="google-btn" onClick={googleLogin}><img src={googleicon} alt="googleicon" className="google-icon" /> Login with Google</button>
                    <ToastContainer />
                </div> 
            }

            {userDetails &&
                <>
                    <div className='gogle-details'>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <img
                            src={userDetails.photoURL}
                            width={"10%"}
                            style={{ borderRadius: "50%" }}
                            alt='userpicture'
                        />
                    </div>
                    <div className="user-detailss" style={{textAlign:"center"}}>
                        <h3>Welcome {userDetails.displayName}</h3>
                        <p>Email: {userDetails.email}</p>
                    </div>
                    <button className="google-btn fb-btn" onClick={handleLogout}>
                        Logout
                    </button>

                    </div>
                </>
            }

            




    </>
  );
}

export default Home;
