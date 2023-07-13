const INPUT_VALIDATION = {
    USERNAME: {
        minLength: 8,
        maxLength: 32,
        pattern: '^[a-zA-Z0-9]+$'
    },
    PASSWORD: {
        minLength: 8,
        maxLength: 32
    },
    PROFILE_NAME: {
        minLength: 1,
        maxLength: 32,
        pattern: '^[a-zA-Z0-9 ]+$'
    },
    PROFILE_AGE: {
        min: 1,
        max: 120,
        step: 1
    },
    PROFILE_DESCRIPTION: {
        minLength: 1,
        maxLength: 256
    }
}

export default INPUT_VALIDATION
