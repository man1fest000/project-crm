import {useEffect, useState} from "react";
import {CreateUserForm, Footer, Header, Modal, Spinner, User} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {usersActions} from "../../redux/slices";
import "./adminPage.scss";
import "../../styles/button.scss";
const AdminPage = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(usersActions.getUsers())
    },[dispatch])

    const {users, loading} = useSelector((state)=>state.usersReducer);


    const [openCreateUser, setOpenCreateUser] = useState(false);


    return (
        <div className={"admin-page"}>
            <Header />

            <div>
                <button onClick={()=> setOpenCreateUser(true)}>Create</button>
            </div>

            <div className={"admin-page__users"}>
                {
                    loading ? <Spinner /> : users.map((user)=> <User key={user.id} user={user}/>)
                }
            </div>


            <Modal closeModal={setOpenCreateUser}  openModal={openCreateUser}>
                <CreateUserForm setOpenCreateUser={setOpenCreateUser} />
            </Modal>

            <Footer />
        </div>
    );
};

export {AdminPage};