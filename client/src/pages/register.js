import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

async function PostUser(user) {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const registerUser = await response.json();
    console.log(registerUser);
    return response.status === 200;
}

function Register() {
    let navigate = useNavigate();
    const [userInput, setUserInput] = React.useState({
        username: '',
        name: '',
        password: '',
    });

    const handler = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    };

    return (
        <Flex alignItems='center' justifyContent='center' h='calc(100vh)' flexDirection='column'>
            <Heading as='h1' size='4xl' noOfLines={1} mb={5}>
                Registro
            </Heading>

            <Box w='35vw' borderRadius={10} borderWidth='1px' padding={10} bg='white'>
                <VStack>
                    <FormControl>
                        <FormLabel as='b'>
                            Nombre de usuario
                        </FormLabel>
                        <Input type='text' name='username' value={userInput.username} onChange={handler} />
                    </FormControl>
                    <FormControl>
                        <FormLabel as='b'>
                            Nombre completo
                        </FormLabel>
                        <Input type='text' name='name' value={userInput.name} onChange={handler} />
                    </FormControl>
                    <FormControl>
                        <FormLabel as='b'>
                            Contraseña
                        </FormLabel>
                        <Input type='password' name='password' value={userInput.password} onChange={handler} />
                    </FormControl>
                    <Button colorScheme='teal' onClick={async () => {
                        const userRegistered = await PostUser(userInput);
                        if (userRegistered) {
                            navigate('/');
                        }
                    }}> Crear cuenta </Button>
                    <Box>
                        <>¿Tienes cuenta? </>
                        <Button colorScheme='teal' variant='link' onClick={() => { navigate('/'); }}>
                            Iniciar sesión
                        </Button>
                    </Box>
                </VStack>
            </Box>
        </Flex>
    );
}

export default Register;