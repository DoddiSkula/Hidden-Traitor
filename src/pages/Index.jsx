import { Layout } from '../components/layout/Layout';
import { Button } from '../components/Button/Button';

export function Index() {

    return (
        <div>
            <Layout>
                <Button link={'/join'} text={'Join game'}  color={'#61ca70'}/>
                <Button link={'/create'} text={'Create game'} color={'#f0b448'}/>
            </Layout>
        </div>
    );
}