import { useAtom } from 'jotai';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteABTest } from '../../../api/tests';
import { deploymentsAtom } from '../../../atoms/deployments';
import { snackbarAtom } from '../../../atoms/snackbar';
import { abTestsAtom } from '../../../atoms/tests';
import { DetailCard } from '../../../components/detail/card';
import OverViewTab from '../../../components/detail/overview-tab';
import { useABTestsData } from '../../../hooks/useABTestsData';
import { useDelete } from '../../../hooks/useDelete';
import { useDeploymentsData } from '../../../hooks/useDeploymentsData';
import { IABTestView } from '../../../interfaces/pages/tests';
import { convertABTestToView } from '../../../utils/pages/tests/ab';

export const ABTestDetail = () => {
    useABTestsData();
    useDeploymentsData();

    const [abTests] = useAtom(abTestsAtom);
    const [deployments] = useAtom(deploymentsAtom);

    const navigate = useNavigate();
    const [, setSnackbarDatum] = useAtom(snackbarAtom);

    const params = useParams();

    const { abTestName } = params;

    if (!abTestName) {
        setSnackbarDatum({
            severity: 'error',
            message: 'abTestName이 주어지지 않았습니다.',
        });
        navigate('/tests/ab', { replace: true });
        return <></>;
    }

    const abTest = abTests.find((e) => e.name === abTestName);

    if (!abTest) {
        setSnackbarDatum({
            severity: 'error',
            message: 'abTestName과 일치하는 AB Test 객체를 찾지 못했습니다.',
        });
        navigate('/tests/ab', { replace: true });
        return <></>;
    }

    const abTestView: IABTestView = convertABTestToView(abTest, deployments);

    const performDelete = useDelete(deleteABTest);

    const deleteAction = async (id: number) => {
        const success = await performDelete(id);

        navigate(`/tests/ab`, { replace: true });

        return success;
    };

    return (
        <div>
            <DetailCard
                title="AB Test Details"
                tabs={['OverView', 'Logs']}
                deleteHandler={() => {
                    deleteAction(abTest.id);
                }}
            >
                <OverViewTab
                    headEl={[
                        'ID',
                        'Name',
                        'Domain',
                        'Deployment A Name',
                        'Deployment A Status',
                        'Deployment A Model Name',
                        'Deployment A Model Version',
                        'Deployment A Deployment Strategy',
                        'Deployment B Name',
                        'Deployment B Status',
                        'Deployment B Model Name',
                        'Deployment B Model Version',
                        'Deployment B Deployment Strategy',
                    ]}
                >
                    <div>{abTestView.id}</div>
                    <div>{abTestView.name}</div>
                    <div>{abTestView.domain}</div>

                    <div>{abTestView.a?.deploymentName}</div>
                    <div>{abTestView.a?.status}</div>
                    <div>{abTestView.a?.modelName}</div>
                    <div>{abTestView.a?.modelVersion}</div>
                    <div>{abTestView.a?.strategy}</div>

                    <div>{abTestView.b?.deploymentName}</div>
                    <div>{abTestView.b?.status}</div>
                    <div>{abTestView.b?.modelName}</div>
                    <div>{abTestView.b?.modelVersion}</div>
                    <div>{abTestView.b?.strategy}</div>
                </OverViewTab>
                <div>Not Implemented</div>
            </DetailCard>
        </div>
    );
};
