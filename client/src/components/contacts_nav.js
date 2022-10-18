import {
    Box,
    Input,
    List,
    ListItem,
    Divider,
    Avatar,
    HStack,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';
import React from 'react';
import { io } from 'socket.io-client';

function UserContainer({ user, logout }) {
    return (
        <HStack h='5vh' p={2} borderRadius={5}>
            <Avatar size='sm' name={user.username} />
            <Text fontSize='sm'>
                {user.username}
            </Text>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    variant='link'
                    icon={<ChevronDownIcon />}
                    _hover={{
                        background: "white",
                        color: "teal.500",
                    }}
                />
                <MenuList>
                    <MenuItem onClick={logout}>
                        Cerrar sesión
                    </MenuItem>
                </MenuList>
            </Menu>
        </HStack>
    );
}

function ContactsList({ contacts, setSelectedUser }) {
    return (
        <List>
            {contacts.length > 0 && contacts.map((value, index) => (
                <ListItem key={index} my={1}>
                    <HStack
                        h={10}
                        p={2}
                        borderRadius={5}
                        _hover={{
                            background: "white",
                            color: "teal.500",
                        }}
                        onClick={() => { setSelectedUser(value) }}>
                        <Avatar size='sm' name={value.name} />
                        <Text fontSize='sm'>
                            {value.username}
                        </Text>
                    </HStack>
                    <Divider />
                </ListItem>
            ))}
        </List>
    );
}

function ContactsNav({ contacts, user, logout, setSelectedUser }) {
    return (
        <Box
            w='100%'
            h='100%'
            display='flex'
            flexDirection='column'
            bg='gray.100'>
            <UserContainer user={user} logout={logout} />
            <Divider my={2} />
            <Input placeholder='Buscar contacto...' bg='gray.200' />
            <Divider my={2} />
            <ContactsList contacts={contacts} setSelectedUser={setSelectedUser} />
        </Box>
    );
}

export default ContactsNav;