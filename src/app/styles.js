export const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "white",
        },
        "&:hover fieldset": {
            borderColor: "#bc8c4e",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#bc8c4e",
        },
        color: "white",
    },
    "& .MuiInputLabel-root": {
        color: "white",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#bc8c4e",
    },
};

export const zoomEffectStyles = {
    transition: 'transform 0.3s ease',
    transform: 'scale(1.1)',
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.2)',
    },
};
