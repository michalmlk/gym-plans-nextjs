import CreatePlanForm from '@/components/plans/create-plan-form';
import Container from '@mui/material/Container';

export default function CreatePlan() {
    return (
        <Container className="p-24 bg-transparent">
            <CreatePlanForm />
        </Container>
    );
}
