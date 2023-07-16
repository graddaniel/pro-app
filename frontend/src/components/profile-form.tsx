import React, {
    ChangeEvent,
    useCallback
} from 'react';
import {
    FormGroup,
    Paper,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import {
    Form
} from 'react-router-dom';

import { AccountRoles } from '../consts/constants';
import INPUT_VALIDATION from '../config/input-validation';

import classes from './profile-form.module.css';

const ProfileForm = () => {
    const [name, setName] = React.useState('');
    const [role, setRole] = React.useState<AccountRoles>(AccountRoles.CUSTOMER);
    const [age, setAge] = React.useState(18);
    const [description, setDescription] = React.useState('');

    const handleNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setName(event.target.value), []);
    const handleRoleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setRole(event.target.value as AccountRoles), []);
    const handleAgeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setAge(+event.target.value), []);
    const handleDescriptionChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value), []);

    return (
        <Paper
            elevation={3}
            className={classes.paper}
        >
            <Form method="POST">
                <FormGroup className={classes.formGroup}>
                    <TextField
                        name="name"
                        label="Name"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        required
                        inputProps={INPUT_VALIDATION.PROFILE_NAME}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            name="role"
                            labelId='role-label'
                            label="Role"
                            value={role}
                            onChange={handleRoleChange}
                            required
                        >
                            <MenuItem value={AccountRoles.CUSTOMER}>Customer</MenuItem>
                            <MenuItem value={AccountRoles.PROFESSIONAL}>Professional</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            name="age"
                            label="Age"
                            type="number"
                            value={age}
                            onChange={handleAgeChange}
                            required
                            inputProps={INPUT_VALIDATION.PROFILE_AGE}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            name="description"
                            label="Description"
                            value={description}
                            onChange={handleDescriptionChange}
                            multiline
                            rows={4}
                            required
                            inputProps={INPUT_VALIDATION.PROFILE_DESCRIPTION}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Create profile
                    </Button>
                </FormGroup>
            </Form>
        </Paper>
    );
};

export default ProfileForm;