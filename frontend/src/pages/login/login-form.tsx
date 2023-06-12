import React, { ChangeEvent, FormEventHandler } from 'react';
import axios from 'axios';
import {
    FormControl,
    FormGroup,
    Paper,
    Input,
    Button,
    InputLabel
} from '@mui/material';

const styles = {
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        margin: '1rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
    }
};

const loginForm = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {
            setLoading(true);
            const response = await axios.post(
                'http://localhost:8081/api/login',
                data
            );

            // TODO Redirect to login page
            console.log(response.data);
        } catch (error) {
            // TODO Error handling
            console.log(error);
        }

        setLoading(false);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
        }
    };

    return (
        <Paper
            elevation={3}
            onSubmit={handleSubmit}
            sx={styles.paper}
            component='form'
            method='POST'
        >
            <FormGroup sx={styles.formGroup}>
                <FormControl>
                    <InputLabel htmlFor='username'>Username</InputLabel>
                    <Input
                        name='username'
                        type='text'
                        value={username}
                        onChange={handleInputChange}
                        required
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <Input
                        name='password'
                        type='password'
                        value={password}
                        onChange={handleInputChange}
                        required
                    />
                </FormControl>
                <Button
                    type='submit'
                    variant='contained'
                    disabled={loading}
                >
                    Login
                </Button>
            </FormGroup>
        </Paper>
    );
};

export default loginForm;
