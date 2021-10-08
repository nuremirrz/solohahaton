import { Container } from '@material-ui/core';
import Navbar from '../components/Navbar';
import Content from '../components/Content';





const MainPage = () => {
    
    return (
        <div>
            <Navbar/>            
            <Container className="container">
                <div className="main">                    
                    <Content/>
                </div>                
            </Container>
        </div>
    );
};

export default MainPage;