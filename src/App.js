import { useState, useEffect } from "react";
import logo from "./Images/logo.svg"

function App() {
  const [input, setInput] = useState("")
  const [personInput, setpersonInput] = useState("")
  const [tip, setTip] = useState(0)
  const [customTip, setCustomTip] = useState("")
  const [tipAmount, setTipAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    tip > 0 ? personInput > 0 ?
      setTipAmount(((input * tip) / personInput)) :
      setTipAmount(0) : setTipAmount(0)
    input > 0 ? personInput > 0 ? setTotalAmount((input / personInput) + tipAmount) : setTotalAmount(0) : setTotalAmount(0)
  }, [input, tip, personInput, tipAmount])


  const removeActiveClass = () => {
    const btns = document.querySelectorAll(".btn")
    btns.forEach(btn => btn.classList.remove("active"))
  }

  const handleChange = (e) => {
    const value = e.target.value
    value > 0 ? value < 100000 ? setInput(value) : setInput(value) : setInput("");
  }
  const handleCustomInputChange = (e) => {
    const value = e.target.value
    removeActiveClass()
    if (value > 0) {
      setCustomTip(value)
      setTip(value / 100)
    } else if (value === 0) {
      setCustomTip(value)
    } else {
      setCustomTip("")
    }
  }
  const handleTip = (e, tipValue) => {
    removeActiveClass()
    setCustomTip("")
    e.target.classList.add("active")
    setTip(tipValue)
  }
  const handlepersonChange = (e) => {
    const value = parseInt(e.target.value)
    if (value > 0) {
      setpersonInput(value)
    } else if (value === 0) {
      setpersonInput(0)
      // set error message
    } else {
      setpersonInput("")
    }
  }
  const handleReset = () => {
    setInput("")
    setTip(0)
    setCustomTip("")
    setTipAmount(0)
    setTotalAmount(0)
    setpersonInput("")
    removeActiveClass()
  }
  const handleCustomInputClick = () => {
    removeActiveClass()
    setTip(0)
  }

  return (
    <main className="container">
      <div className="heading">
        <h1>
          <span>Spli</span><span>tter</span>
        </h1>
        <img src={logo} alt="logo" />
      </div>
      <div className="calculator">
        <div className="input-section">
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <div className="field-box input-bill">
              <label className="label" htmlFor="bill">Bill</label>
              <input type="number" id="bill" value={input} max="99999" placeholder="0" onChange={handleChange} />
            </div>
            <div className="field-box input-tip">
              <p className="label">Select Tip %</p>
              <div className="tip-options-container">
                <button className="tip-option btn" onClick={(e) => handleTip(e, .05)} >5% </button>
                <button className="tip-option btn" onClick={(e) => handleTip(e, .10)} >10% </button>
                <button className="tip-option btn" onClick={(e) => handleTip(e, .15)} >15% </button>
                <button className="tip-option btn" onClick={(e) => handleTip(e, .25)} >25% </button>
                <button className="tip-option btn" onClick={(e) => handleTip(e, .50)} >50% </button>
                <input type="number" className="tip-option custom-input" onClick={handleCustomInputClick} onChange={handleCustomInputChange} value={customTip} placeholder="Custom" />
              </div>
            </div>
            <div className="field-box input-people">
              <label className={personInput===0 ? "error label": "hidden label"} htmlFor="people"> Number of People <span> can't be zero </span> </label>
              <input id="people" type="number" value={personInput} placeholder="0" onChange={handlepersonChange} />
            </div>
          </form>
        </div>
        <div className="output-section">
          <div className="output-screen">
            <div className="output-row">
              <div className="output-label">
                <span>Tip Amount</span>
                <span>/ person</span>
              </div>
              <div className="output-value">${tipAmount.toFixed(2)}</div>
            </div>
            <div className="output-row">
              <div className="output-label">
                <span>Total</span>
                <span>/ person</span>
              </div>
              <div className="output-value">${totalAmount.toFixed(2)}</div>
            </div>
          </div>
          <div className="reset-btn">
            <button className={
              totalAmount > 0 ? "reset active" : "reset"
            } onClick={handleReset} >RESET</button>
          </div>
        </div>
      </div>
      <div className="attribution">
        Coded by <a href="https://instagram.com/vishal_brdr">Vishal Biradar</a>
      </div>
    </main>
  );
}

export default App;
