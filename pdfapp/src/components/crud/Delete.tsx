import axiosInstance from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
//MaterialUI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default function Delete() {
    const history = useNavigate();
    const { id } = useParams();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        axiosInstance
            .delete('delete/' + id)
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            })
            .then(function () {
                history('/', { replace: true });
                // window.location.reload();
            });
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box
                display="flex"
                justifyContent="center"
                m={1}
                p={1}
                bgcolor="background.paper">
                <br/>
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    onClick={handleSubmit}>
                    Press here to confirm delete
                </Button>
            </Box>
        </Container>
    );
}