import { Layout } from '../components/layout/Layout';
import { Button } from '../components/Button/Button';

export function Index() {

    return (
        <div>
            <Layout>
                <Button link={'/join'} text={'Join game'}  color={'#2cc242'}/>
                <Button link={'/create'} text={'Create game'} color={'#F2941C'}/>
            </Layout>
        </div>
    );
}