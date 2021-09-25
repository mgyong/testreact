import {
    makeStyles,
    Container,
    Typography,
    TextField,
    Button,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as React from 'react';
import { useState } from "react";
import {useQuery,useMutation, useLazyQuery} from "@apollo/client";
import {GET_USER,UPDATE_USER} from "./query";
import {handleErrors} from "../../utils/utils";
import {USER_LOGIN} from "../Login/query";


const useStyles = makeStyles((theme) => ({
    heading: {
        textAlign: "center",
        margin: theme.spacing(1, 0, 4),
    },
    submitButton: {
        marginTop: theme.spacing(4),
    },
}));

interface IFormInput {
    username: string;
    password: string;
    email: string;
    full_name: string;
    first_name: string;
    last_name: string;
    mailing_address: string;
    phone: string;
    phone1: string;
}


export const ProfileContainer = (props) => {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IFormInput>();

    const username1 = props.username;
    //console.log('username: ',username1)

    const { data, error, loading } = useQuery(GET_USER, {variables:{"username":username1}});
    const [updateUserMutation] = useMutation(UPDATE_USER);

    const [serverErrors, setServerErrors] = useState<any>([]);

    const { heading, submitButton } = useStyles();

    //var updateUserMutation: any ={};
    //[updateUserMutation] = useMutation(UPDATE_USER);

    if (error || !data) {
        console.log(error);
        return <div>ERROR!</div>;
    }

    const handleUpdateProfile = async (formData: IFormInput) => {
        const updateoutput = {username: username1, password:formData.password, full_name: formData.full_name, email: formData.email,first_name: formData.first_name,last_name: formData.last_name,mailing_address: formData.mailing_address,phone: formData.phone,phone1: formData.phone1}

        try {
            const res = await updateUserMutation({
                variables: {"data": updateoutput},
            })
            res.data.users.map(user => (console.log("send message:",user)))
        } catch (e) {
            const errors = handleErrors(e)
            console.log("errors: ",errors)
            setServerErrors(errors)
        }

    }//end of handleUpdateProfile

    return(
            <div>
                <Container maxWidth="xs">
                    <Typography className={heading} variant="h5">
                        Profile
                    </Typography>
                    <form onSubmit={handleSubmit(handleUpdateProfile)}>
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
                            defaultValue={ data.users.map(user => user.username)}
                            error={!!errors.username?.message}
                            type="username"
                            fullWidth
                            required
                        />
                        <TextField
                            {...register("password")}
                            variant="outlined"
                            margin="normal"
                            label="Password"
                            helperText={errors.password?.message}
                            defaultValue={ data.users.map(user => user.password)}
                            error={!!errors.password?.message}
                            type="password"
                            fullWidth
                            required
                        />
                        <TextField
                            {...register("email")}
                            variant="outlined"
                            margin="normal"
                            label="Email"
                            helperText={errors.email?.message}
                            defaultValue={ data.users.map(user => user.email)}
                            error={!!errors.email?.message}
                            fullWidth
                        />
                        <TextField
                            {...register("full_name")}
                            variant="outlined"
                            margin="normal"
                            label="Full Name"
                            helperText={errors.full_name?.message}
                            defaultValue={ data.users.map(user => user.full_name)}
                            error={!!errors.full_name?.message}
                            fullWidth
                        />
                        <TextField
                            {...register("mailing_address")}
                            variant="outlined"
                            margin="normal"
                            label="Mailing Address"
                            helperText={errors.mailing_address?.message}
                            defaultValue={ data.users.map(user => user.mailing_address)}
                            error={!!errors.mailing_address?.message}
                            fullWidth
                        />
                        <TextField
                            {...register("last_name")}
                            variant="outlined"
                            margin="normal"
                            label="Last Name"
                            helperText={errors.last_name?.message}
                            defaultValue={ data.users.map(user => user.last_name)}
                            error={!!errors.last_name?.message}
                            fullWidth
                        />
                        <TextField
                            {...register("first_name")}
                            variant="outlined"
                            margin="normal"
                            label="First Name"
                            helperText={errors.first_name?.message}
                            defaultValue={ data.users.map(user => user.first_name)}
                            error={!!errors.first_name?.message}
                            fullWidth
                        />
                        <TextField
                            {...register("phone")}
                            variant="outlined"
                            margin="normal"
                            label="Phone"
                            helperText={errors.phone?.message}
                            defaultValue={ data.users.map(user => user.phone)}
                            error={!!errors.phone?.message}
                            fullWidth
                        />
                        <TextField
                            {...register("phone1")}
                            variant="outlined"
                            margin="normal"
                            label="Phone1"
                            helperText={errors.phone1?.message}
                            defaultValue={ data.users.map(user => user.phone1)}
                            error={!!errors.phone1?.message}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={submitButton}
                        >
                            Update
                        </Button>
                    </form>
                </Container>
            </div>
    );
}
