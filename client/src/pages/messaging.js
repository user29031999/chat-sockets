import {
    Grid,
    GridItem,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/auth_context.js';
import React from 'react';
import ContactsNav from '../components/contacts_nav.js';
import MessagesNav from '../components/messages_nav.js';

function Messaging() {
    let navigate = useNavigate();
    const [users, setUsers] = React.useState([]);
    const [selectedUser, setSelectedUser] = React.useState();
    const userSession = React.useContext(AuthContext);

    console.log(process.env.REACT_APP_SERVER);

    async function fetchUsers() {
        let users = await fetch(`${process.env.REACT_APP_SERVER}/users/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        setUsers(await users.json());
    }

    async function logout() {
        let logout = await fetch(`${process.env.REACT_APP_SERVER}/auth/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        console.log(logout);
        if (logout.status === 200) {
            navigate('/', { replace: true });
        }
    }

    React.useEffect(() => {
        fetchUsers();
    }, []);


    React.useEffect(() => {
        console.log('session messaging', userSession);
    }, [userSession]);

    return (
        <Grid
            templateAreas={`
                  "nav main"
            `}
            gridTemplateColumns={'30% 70%'}
            h='100vh'
            color='blackAlpha.700'
            fontWeight='bold'
        >
            <GridItem p='2' area={'nav'}>
                {userSession && <ContactsNav
                    contacts={users}
                    user={userSession}
                    logout={logout}
                    setSelectedUser={setSelectedUser}
                />}
            </GridItem>
            <GridItem bg='gray.50' area={'main'}>
                <MessagesNav userConversation={selectedUser} />
            </GridItem>
        </Grid>
    );
}

export default Messaging;