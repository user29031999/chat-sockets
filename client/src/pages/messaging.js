import { Grid, GridItem, Box, Input, List, ListItem, Divider, Avatar, HStack, Text, Heading } from '@chakra-ui/react'
import React from 'react';

function ContactsNav({ contacts }) {
    return (
        <Box
            w='100%'
            h='100%'
            display='flex'
            flexDirection='column'
            bg='gray.100'>
            <Heading size='lg'>
                Contactos
            </Heading>
            <Divider my={2} />
            <Input placeholder='Buscar contacto...' />
            <Divider my={2} />
            <List>
                {contacts.length > 0 && contacts.map((value, index) => (
                    <ListItem key={index} my={1}>
                        <HStack h='5vh' p={2} borderRadius={5} _hover={{
                            background: "white",
                            color: "teal.500",
                        }}>
                            <Avatar size='sm' name={value.name} />
                            <Text fontSize='sm'>
                                {value.username}
                            </Text>
                        </HStack>
                        <Divider />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

function Messaging() {
    const [users, setUsers] = React.useState([]);

    async function fetchUsers() {
        let users = await fetch("http://localhost:5000/users/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        setUsers(await users.json());
    }

    React.useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Grid
            templateAreas={`
                  "nav main"
            `}
            gridTemplateColumns={'30% 70%'}
            h='calc(100vh)'
            gap='1'
            color='blackAlpha.700'
            fontWeight='bold'
        >
            <GridItem p='2' area={'nav'}>
                <ContactsNav contacts={users} />
            </GridItem>
            <GridItem pl='2' bg='gray.50' area={'main'}>
                Main
            </GridItem>
        </Grid>
    );
}

export default Messaging;