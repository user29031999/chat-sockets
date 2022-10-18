import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

async function login(user) {
    let login = await fetch(`${process.env.REACT_APP_SERVER}/auth/login`,
        {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

    console.log(await login.json());
}

function Home() {
    let navigate = useNavigate();

    const [loginInput, setLoginInput] = React.useState({
        username: '',
        password: '',
    });

    const handlerInput = (e) => {
        setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
    }

    return (
        <Flex alignItems='center' justifyContent='center' h='calc(100vh)' flexDirection='column'>
            <Heading as='h1' size='4xl' noOfLines={1} mb={5}>
                Bienvenido
            </Heading>

            <Box w='35vw' borderRadius={10} borderWidth='1px' padding={10} bg='white'>
                <VStack>
                    <FormControl>
                        <FormLabel as='b'>
                            Nombre de usuario
                        </FormLabel>
                        <Input name='username' type='text' onChange={handlerInput} />
                    </FormControl>
                    <FormControl>
                        <FormLabel as='b'>
                            Contraseña
                        </FormLabel>
                        <Input name='password' type='password' onChange={handlerInput} />
                    </FormControl>
                    <Button
                        colorScheme='teal'
                        onClick={() => {
                            login(loginInput);
                        }}>
                        Iniciar Sesión
                    </Button>
                    <Box>
                        <>¿No tienes cuenta? </>
                        <Button
                            colorScheme='teal'
                            variant='link'
                            onClick={() => { navigate('/register'); }}>
                            Crea tu cuenta
                        </Button>
                    </Box>
                </VStack>
            </Box>
        </Flex>
    );
}

export default Home;