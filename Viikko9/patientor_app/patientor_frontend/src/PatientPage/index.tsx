import React, { Props } from "react";
import { Container, Header, Button, List } from "semantic-ui-react";
import axios from "axios";
import { apiBaseUrl } from "../constants";


import { useStateValue } from "../state";
import { useParams, Link } from "react-router-dom";
import { Patient } from "../types";

interface GenderProps {
    gender: string;
}
const Gender: React.FC<GenderProps> = (props) => {
    if (props.gender === "male") {
        return <List.Icon name='man' />

    } else if (props.gender === "female") {
        return <List.Icon name='woman' />
    } else {
        return <List.Icon name='other gender' />
    }
};
const PatientPage: React.FC = () => {
    const [{ patient }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    React.useEffect(() => {
        const fetchPatientList = async () => {
            if (patient?.id !== id) {
                try {
                    const { data: patientListFromApi } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    dispatch({ type: "GET_PATIENT", payload: patientListFromApi });
                } catch (e) {
                    console.error(e);
                }
            } else {
                dispatch({ type: "GET_PATIENT", payload: patient });
            }
        };
        fetchPatientList();
    }, [dispatch]);

    if (patient) {
        return (

            <div className="App">
                <Container textAlign="left">
                    <Header as="h3">Patient Page</Header>
                    <List>
                        <List.Item>
                            <List.Content>{patient.name}<Gender gender={patient.gender} /></List.Content>
                            
                        </List.Item>
                        <List.Item>
                            <List.Content>{patient.ssn}</List.Content>

                        </List.Item>
                        <List.Item>
                            <List.Content>{patient.occupation}</List.Content>


                        </List.Item>
                    </List>
                </Container>

            </div>


        );
    } else {
        return (
            <p>loading...</p>
        )
    }

};

export default PatientPage;