import Container from '@mui/material/Container';

export default function PlanPage({ params }) {
    const { id } = params;
    return (
        <Container className="p-24">
            <main>This is plan with id: {id}</main>
        </Container>
    );
}
