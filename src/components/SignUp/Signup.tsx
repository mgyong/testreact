import {
    makeStyles,
    Container,
    Typography,
    TextField,
    Button,
} from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {useMutation} from "@apollo/client";
import { useHistory } from 'react-router-dom'
import {CREATEUSER_MUTATE} from "./query";
import { handleErrors } from '../../utils/utils'

interface IFormInput {
    username: string;
    password: string;
    email: string;
    full_name: string;
}

interface createUserVars {
    username: string;
    password: string;
    full_name: string;
    email: string;
}

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required().min(8).max(120),
    email: yup.string().required(),
    full_name: yup.string().required().min(2).max(25),
});

const useStyles = makeStyles((theme) => ({
    heading: {
        textAlign: "center",
        margin: theme.spacing(1, 0, 4),
    },
    submitButton: {
        marginTop: theme.spacing(4),
    },
}));

const SignupContainer = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IFormInput>({
        resolver:yupResolver(schema)
    });
    const [registerMutation, { data, loading, error }] = useMutation(CREATEUSER_MUTATE);
    const [serverErrors, setServerErrors] = useState<any>([]);
    const history = useHistory();

    const { heading, submitButton } = useStyles();

    const [json, setJson] = useState<string>();

    const registerUser = async (formData: IFormInput) => {
        setServerErrors([])
        const cuv:createUserVars = {username: formData.username, password:formData.password, full_name: formData.full_name, email: formData.email}
        console.log("createUserVars: ",cuv);

        try {
            const res = await registerMutation({
                variables: {"data": cuv},
            })
            res.data.users.map(user => (console.log("user details:",user)))
        } catch (e) {
            const errors = handleErrors(e)
            console.log("errors: ",errors)
            setServerErrors(errors)
        }
    }

    // @ts-ignore
    return (
        <Container maxWidth="xs">
            <Typography className={heading} variant="h3">
                Sign Up Form
            </Typography>
            <form onSubmit={handleSubmit(registerUser)}>
                {serverErrors.length > 0 && (
                    <div className="mb-4">
                        {serverErrors.map((e: any) => (
                            e.message
                        ))}
                    </div>
                )}
                <TextField
                    {...register("username")}
                    variant="outlined"
                    margin="normal"
                    label="Username"
                    helperText={errors.username?.message}
                    error={!!errors.username?.message}
                    type="username"
                    fullWidth
                />
                <TextField
                    {...register("password")}
                    variant="outlined"
                    margin="normal"
                    label="Password"
                    helperText={errors.password?.message}
                    error={!!errors.password?.message}
                    type="password"
                    fullWidth
                />
                <TextField
                    {...register("email")}
                    variant="outlined"
                    margin="normal"
                    label="Email"
                    helperText={errors.email?.message}
                    error={!!errors.email?.message}
                    fullWidth
                    required
                />
                <TextField
                    {...register("full_name")}
                    variant="outlined"
                    margin="normal"
                    label="Full Name"
                    helperText={errors.full_name?.message}
                    error={!!errors.full_name?.message}
                    fullWidth
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={submitButton}
                >
                    Sign Up
                </Button>
                {json && (
                    <>
                        <Typography variant="body1">
                            Below is the JSON that would normally get passed to the server
                            when a form gets submitted
                        </Typography>
                        <Typography variant="body2">{json}</Typography>
                    </>
                )}
            </form>
        </Container>
    );
}

export default SignupContainer;