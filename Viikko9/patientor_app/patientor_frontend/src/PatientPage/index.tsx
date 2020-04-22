import React from "react";
import { Container, List } from "semantic-ui-react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { getPatient, getDiagnoses } from "../state";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient, Entry, Diagnose } from "../types";

interface GenderProps {
    gender: string;
}
interface EntryProps {
    entries: Entry[];
}
interface DiagnoseProps {
    codes: string[] | undefined;
    diagnoses: Diagnose[] | undefined;
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
const Entries: React.FC<EntryProps> = ({ entries }) => {
    return (
        <List.Item>{entries.map(e => <List.Content key={e.id}>{e.date} {e.description}</List.Content>)}</List.Item>

    )
};
const Diagnoses: React.FC<DiagnoseProps> = ({ codes, diagnoses }) => {
    return (
        <List.Item>{codes?.map(c => <List.Content key={c}>{c}  {diagnoses?.find(d => d.code === c)?.name}</List.Content>)}</List.Item>

    )

};
const PatientPage: React.FC = () => {
    const [{ patient, diagnoses }, dispatch] = useStateValue();

    const { id } = useParams<{ id: string }>();
    React.useEffect(() => {
        const fetchPatientList = async () => {
            if (patient?.id !== id) {
                try {
                    const { data: patientListFromApi } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    dispatch(getPatient(patientListFromApi));
                    console.log("loaded from api")
                } catch (e) {
                    console.error(e);
                }
            } else {
                dispatch(getPatient(patient));
            }
        };
        const fetchDiagnoseList = async () => {
            if (diagnoses === undefined) {
                console.log("joo")

                try {
                    const { data: diagnoseListFromApi } = await axios.get<Diagnose[]>(
                        `${apiBaseUrl}/diagnoses`
                    );
                    dispatch(getDiagnoses(diagnoseListFromApi));

                } catch (e) {
                    console.error(e);
                }

            };
        }
        fetchDiagnoseList();
        fetchPatientList();
    }, [dispatch]);


    if (patient) {
        return (
            <div className="App">
                <Container textAlign="left">
                    <List>
                        <List.Item>
                            <List.Content as="h2">{patient.name}<Gender gender={patient.gender} /></List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>{patient.ssn}</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>{patient.occupation}</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>{''}</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content as="h3">entries</List.Content>
                        </List.Item>
                        <List.Item>
                            <Entries key={patient.name} entries={patient.entries} />
                        </List.Item>
                        {patient.entries.map(e => <Diagnoses key={e.description} codes={e.diagnosisCodes} diagnoses={diagnoses} />)}
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