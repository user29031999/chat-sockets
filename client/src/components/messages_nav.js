import React from 'react';
import {
    Box,
    Avatar,
    HStack,
    Text,
    Divider,
    Input,
    Flex,
    Heading,
    Spacer,
    List,
    ListItem,
    Button,
    Collapse,
    useDisclosure
} from "@chakra-ui/react";
import EmojiPicker from 'emoji-picker-react';
import { io } from 'socket.io-client';

function MessagesContainer({ userConversation }) {
    const [messages, setMessages] = React.useState([]);
    const [inputMessage, setInputMessage] = React.useState('');
    const [socket, setSocket] = React.useState(null);
    const { isOpen, onToggle } = useDisclosure();

    React.useEffect(() => {
        const newSocket = io(process.env.REACT_APP_SERVER);
        setSocket(newSocket);
        return () => {
            console.log('unmount');
            newSocket.disconnect();
        }
    }, []);

    if (socket) {
        socket.on("connect", () => {
            console.log(socket.id);
        });

        socket.on("messages", (data) => {
            console.log(data);
            setMessages(data);
        });
    }

    const postMessage = async (message) => {
        let response = await fetch(`${process.env.REACT_APP_SERVER}/messaging`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                message: message,
                sender_id: userConversation.user_id
            })
        });
        return response;
    };

    function handleInput(e) {
        e.preventDefault();
        setInputMessage(e.target.value);
    }

    function handlerKeyDown(e) {
        if (e.key === 'Enter') {
            console.log('enter key, ', inputMessage);
            postMessage(inputMessage);
            setInputMessage('');
        }
    }

    function handlerEmoji(emojiData, e) {
        console.log('enter key, ', emojiData);
        postMessage(emojiData.emoji);
        setInputMessage('');
    }

    return (
        <Flex h='100vh' direction='column'>
            <Flex minWidth='max-content' alignItems='center' gap={2} p='3'>
                <Avatar size='sm' name={userConversation.name} />
                <Box>
                    <Heading size='md'>{userConversation.username}</Heading>
                </Box>
            </Flex>
            <Divider />
            <Box h='100%' p={3} overflowX="auto" sx={
                {
                    '::-webkit-scrollbar': {
                        width: '6px',
                        backgroundColor: 'transparent',
                    },
                    '::-webkit-scrollbar-thumb': {
                        backgroundColor: 'gray.400',
                    }
                }
            }>
                <List>
                    {messages.map((value, index) => (
                        <ListItem
                            key={index}
                            display='flex'
                            justifyContent={value.sender_id === userConversation.user_id ? 'end' : 'start'}>
                            <Box
                                w='max-content'
                                p={2}
                                m={1}
                                bg={value.sender_id === userConversation.user_id ? 'teal.400' : 'gray.200'}
                                color={value.sender_id === userConversation.user_id ? 'gray.100' : 'gray.800'}
                                borderRadius={5}
                            >
                                <Text fontSize='sm'>
                                    {value.message}
                                </Text>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Divider />
            <Collapse in={isOpen} animateOpacity>
                <EmojiPicker width='100%' visible={false} onEmojiClick={handlerEmoji} />
            </Collapse>
            <Box h='9%' p={2} display='flex' gap={1}>
                <Button onClick={onToggle}>Emojis</Button>
                <Input
                    placeholder="Escriba su mensaje"
                    bg='gray.200'
                    value={inputMessage}
                    onChange={(e) => { handleInput(e) }}
                    onKeyDown={handlerKeyDown} />
            </Box>
        </Flex >
    );
}

function MessagesNav({ userConversation }) {
    return (
        <Box>
            {userConversation && <MessagesContainer userConversation={userConversation} />}
        </Box>
    );
}

export default MessagesNav;