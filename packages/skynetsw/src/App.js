import './App.css';

setTimeout(() => {
  document.cookie = "skynetsw=1";
  window.location.reload();
}, 5000);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Checking your browser
        </p>
      </header>
    </div>
  );
}

export default App;
