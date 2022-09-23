
import React from 'react'
import coinarray from './coinarray'


function UI({ data }) {

let i = 0
  let currencyKeys=[];
  for(let key in coinarray){
    currencyKeys[i] = key
    i++
  }

  const [amount1, setAmount1] = React.useState('')
  const [amount2, setAmount2] = React.useState('')
  const [currency1, setCurrency1] = React.useState("Bitcoin")
  const [currency2, setCurrency2] = React.useState("Bitcoin")

  function convertPressed(){
    const coin1Id = coinarray[currency1]
    const coin2Id = coinarray[currency2]
    const coin1Dollar = data[coin1Id].usd
    const coin2Dollar = data[coin2Id].usd
    const result = coin1Dollar/coin2Dollar * amount1
    setAmount2(result.toFixed(4))
  }


  function input1(event){
    setAmount1(event.target.value)
  }

  function input2(){
  }

  function currency1Changed(event){
    setCurrency1(event.target.value)
  }

  function currency2Changed(event){
    setCurrency2(event.target.value)
  }

  return (
    <div className='main-div'>
      <div className='div-1'>
      <label className="custom-field one">
      <input placeholder="" onChange={input1} type="text" value={amount1} required></input>
      <span className="placeholder">Enter Amount</span>
      </label>
      <label className="custom-select">
      <select value={currency1} onChange={currency1Changed}>
         {
          currencyKeys.map(key => <option key={key} value={key}>{key}</option>)
         }
      </select>
      </label>
      </div>
      <div className='div-2'>
      <input placeholder='Result' className="output" type="text" value={amount2} onChange={input2}></input>
      <label className="custom-select">
      <select value={currency2} onChange={currency2Changed}>
         {
          currencyKeys.map(key => <option key={key} value={key}>{key}</option>)
         }
      </select>
      </label>
      </div>
      <input style={{height:'40px'}} type='text' placeholder='Enter Your Master Card'></input>
      <div className='div-3'>
      <button className='convert-button' onClick={convertPressed}>Convert</button>
      <button className='convert-button'>PAY</button>
      </div>
    </div>
  )
}

export default UI