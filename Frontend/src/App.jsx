import ChatBox from './components/chatBox';
import './styles/chat.css';
import wave from './assets/wave.svg';
import './App.css';

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Second Brain AI</h1>
        <p>Your personal knowledge companion</p>
      </header>
      <ChatBox />
      <img src={wave} alt="Wave design" className="Wave-bg" />
    </div>
  );
}

export default App;
