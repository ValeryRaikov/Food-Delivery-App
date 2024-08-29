import { assets } from '../../../assets/assets';
import './AppDownload.css';

export default function AppDownload() {
    return (
        <div className="app-download" id="app-download">
            <p>For better experience download the<br />Tomato App</p>
            <div className="app-download-platforms">
                <img src={assets.play_store} />
                <img src={assets.app_store} />
            </div>
        </div>
    );
}