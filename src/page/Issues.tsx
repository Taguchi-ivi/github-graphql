import React from 'react';
import { useQuery} from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Card, CardBody } from '@chakra-ui/react';
import { GET_ISSUES } from '../query/SearchIssues';
import Loading from '../components/Loading'
import PageTitle from '../components/PageTitle'
import IssuesHeader from '../components/IssuesHeader'
import IssuesList from '../components/IssuesList';

const Issues: React.FC = () => {
    const params = useParams();
    const id = params.id
    const { loading, error, data } = useQuery(GET_ISSUES, {
        variables: {
            repositoryId: id
        }
    });


    if (loading) return <Loading />;
    if (error) return <p>Error :{error.message}</p>;

    return (
        <>
            <PageTitle pageName="Issues Search" />
            {!id && (<h3>正しいURLを指定してください</h3>)}
            {data && (
                <Card>
                    <CardBody>
                        <IssuesHeader data={data} />
                        <IssuesList data={data} />
                    </CardBody>
                </Card>
            )}
        </>
    )
}

export default Issues