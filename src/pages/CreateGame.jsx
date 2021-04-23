import { Button } from '../components/Button/Button';
import { Form } from '../components/Form/Form';
import { Layout } from '../components/layout/Layout';

export function CreateGame() {
    return (
        <Layout>
            <Form buttonText={'Create'} buttonColor={'#F2941C'}/>
            <Button link={'/'} text={'Back'} />
        </Layout>
    );
}