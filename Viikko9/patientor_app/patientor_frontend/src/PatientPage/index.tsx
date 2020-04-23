import React from "react";
import { Container, List, Card, Header, Icon } from "semantic-ui-react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { getPatient, getDiagnoses } from "../state";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient, Entry, Diagnose } from "../types";

interface GenderProps {
    gender: string;
}
interface DiagnoseProps {
    codes: string[] | undefined;
    diagnoses: Diagnose[] | undefined;
}
const Gender: React.FC<GenderProps> = (props) => {
    if (props.gender === "male") {
        return <List.Icon name='man' />;
    } else if (props.gender === "female") {
        return <List.Icon name='woman' />;
    } else {
        return <List.Icon name='other gender' />;
    }
};
const Entries: React.FC<{ entries: Entry[]; diagnoses: Diagnose[] | undefined }> = ({ entries, diagnoses }) => {
    return (
        <>{entries.map(e =>
            <Card fluid key={e.id}>
                <EntryDetails entry={e} diagnoses={diagnoses} />
            </Card>)}
        </>
    );
};
const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnose[] | undefined }> = ({ entry, diagnoses }) => {
    switch (entry.type) {
        case ("Hospital"):
            return <HospitalEntry entry={entry} diagnoses={diagnoses} icon = 'ambulance'/>;
        case ("OccupationalHealthcare"):
            return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} icon = 'user md'/>;
        case ("HealthCheck"):
            return <HealthCheck entry={entry} diagnoses={diagnoses} icon = 'heartbeat'/>;
        default:
            return <></>;
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HealthCheck: React.FC<{ entry: Entry; diagnoses: Diagnose[] | undefined; icon: any }> = ({ entry, diagnoses, icon }) => {
    return (
        <EntryContent entry={entry} diagnoses={diagnoses} icon={icon}/>
    );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OccupationalHealthcare: React.FC<{ entry: Entry; diagnoses: Diagnose[] | undefined; icon: any }> = ({ entry, diagnoses, icon }) => {
    return (
        <EntryContent entry={entry} diagnoses={diagnoses} icon={icon}/>
    );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HospitalEntry: React.FC<{ entry: Entry; diagnoses: Diagnose[] | undefined; icon: any }> = ({ entry, diagnoses, icon }) => {
    return (
        <EntryContent entry={entry} diagnoses={diagnoses} icon={icon} />
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EntryContent: React.FC<{ entry: Entry; diagnoses: Diagnose[] | undefined; icon: any}> = ({ entry, diagnoses, icon }) => {
    return (
        
        <>
            {console.log(icon)}
            <Card.Content>
                <Card.Header>{entry.date}  <Icon fitted name={icon}/></Card.Header> 
                <Card.Meta as="i"> {entry.description}</Card.Meta>
                <List bulleted>
                    <Diagnoses key={entry.description} codes={entry.diagnosisCodes} diagnoses={diagnoses} />
                </List>
            </Card.Content>
        </>
    );
};

const Diagnoses: React.FC<{ codes: string[] | undefined; diagnoses: Diagnose[] | undefined }> = ({ codes, diagnoses }) => {
    return (
        <>
            {codes?.map(c => <List.Item key={c}>{c}  {diagnoses?.find(d => d.code === c)?.name}</List.Item>)}
        </>
    );
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
                    console.log("loaded from api");
                } catch (e) {
                    console.error(e);
                }
            } else {
                dispatch(getPatient(patient));
            }
        };
        const fetchDiagnoseList = async () => {
            if (diagnoses === undefined) {
                console.log("joo");

                try {
                    const { data: diagnoseListFromApi } = await axios.get<Diagnose[]>(
                        `${apiBaseUrl}/diagnoses`
                    );
                    dispatch(getDiagnoses(diagnoseListFromApi));

                } catch (e) {
                    console.error(e);
                }

            }
        };
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
                    </List>
                    <Header size='medium'>Entries</Header>
                    <Entries key={patient.name} entries={patient.entries} diagnoses={diagnoses} />
                </Container>
            </div>
        );
    } else {
        return (
            <p>loading...</p>
        );
    }

};

export default PatientPage;