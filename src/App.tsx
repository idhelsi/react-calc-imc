import { useState } from "react";
import  styles  from "./App.module.css";

import leftArrowIMage from "./assets/leftarrow.png";
import { GridItem } from './components/Griditem'

import { levels, calculateIMC, Level } from './helpers/imc';

export const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if(heightField && weightField) {
      setToShow(calculateIMC(heightField, weightField));
    } else {
      alert('digite todos os campos');
    }
  }

  const handlebBAckButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para Ídice de Massa Corpora, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso idal de cada pessoa.</p>
           
          <input 
            type="number" 
            placeholder="Digite a sua altura. Ex: 1.5 (em metros)"
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <input 
            type="number" 
            placeholder="Digite a seu peso. Ex: 75.3 (em kg)"
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
              <GridItem key={key} item={item} />
              ))}
            </div>
          }
          {toShow &&
           <div className={styles.rightBig}>
            <div className={styles.rightArrow} onClick={handlebBAckButton}>
              <img src={leftArrowIMage} alt='' width={25}/>
            </div>
            <GridItem item={toShow} />
           </div>  
          }
        </div>
      </div>
    </div>
  )
}

export default App;