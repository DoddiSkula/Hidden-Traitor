import { Button } from '../components/Button/Button';
import { Form } from '../components/Form/Form';
import { Layout } from '../components/layout/Layout';

export function JoinGame() {
    return (
        <Layout>
            <Form buttonText={'Join'} buttonColor={"#2cc242"} />
            <Button link={'/'} text={'Back'} />
        </Layout>
    );
}