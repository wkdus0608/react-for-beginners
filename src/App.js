const { useState, useEffect } = require("react");

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState("");


  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const onChange = (event) => {
    setAmount(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(amount);
  }

  return (
    <div>
      <h1>Use Coin API</h1>
      <p style={{ fontWeight: "bold" }}>You can see {coins.length} coin list </p>
      {loading ? <strong>Loading...</strong> : null}
      <h2 style={{ fontSize: "15px" }}>Write dollar you want to invest</h2>

      <form onSubmit={handleSubmit}>
      <input type="number" onChange={onChange} placeholder="$"></input>
      </form>

      <ul>
        {coins.map((coin) => (
          <li> {coin.name}({coin.symbol})
            <ul>
              <li>Amount you can buy : {(amount)/(coin.quotes.USD.price)}</li>
            </ul>
          </li>
        ))
        }
      </ul>

    </div>
  );
}

export default App;