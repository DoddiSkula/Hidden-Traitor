import { Button } from '../components/Button/Button';
import { Form } from '../components/Form/Form';
import { Layout } from '../components/layout/Layout';

export function CreateGame() {
    return (
        <Layout>
            <Form buttonText={'Create'} buttonColor={'#f0b448'} mode={"create"}/>
            <Button link={'/'} text={'Back'} />
        </Layout>
    );
}