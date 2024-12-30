import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from "react-router-dom";
import RouterAplication from "./routes/routes";
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
    return (
        <div>
            <BrowserRouter >
                <Provider store={store}>
                    <RouterAplication />
                </Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;