import { useEffect, useState } from 'react'
import Header from './Header.jsx'
import Skip from './Skip.jsx'
import './App.css'

function App() {
  const [skips, setSkips] = useState([])
  const [selectedSkipId, setSelectedSkipId] = useState(null)
  const selectedSkip =skips.find((s)=> s.id === selectedSkipId);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft')
      .then((res) => res.json())
      .then((data) => {
        console.log('Dati ricevuti:', data)
        if (Array.isArray(data)) {
          setSkips(data)
        } else {
          console.error('Struttura dati inaspettata:', data)
        }
      })
      .catch((err) => {
        console.error('Errore durante il fetch:', err)
      })
  }, [])

  const handleSkipSelect = (id) => {
    if (id !== selectedSkipId) {
      setSelectedSkipId(id)
      showBanner()  
    }
  }
  const showBanner = () => {
    setIsBannerVisible(true);
  };
  const hideBanner = () => {
    setIsBannerVisible(false);
  };
  

  return (
    <>
      <Header />
      <div className="container">
      <h2>Choose Your Skip Size</h2>
      <p className="needs">Select the skip size that best suits your needs</p>

      {skips.length === 0 ? (
        <p>Loading...</p>
      ) : (
        skips.map((skip, index) => (
          <Skip
          key={skip.id}
          skip={skip}
          isSelected={skip.id === selectedSkipId}
          onSelect={()=> handleSkipSelect(skip.id)}
          isLast={index ===skips.length -1} />
        ))
      )}
      </div>
      {selectedSkipId && (
      <div className={`bottom-banner ${isBannerVisible ? 'show' : ''}`}>
        <div className="banner-inner">
          <p>{selectedSkip.size} Yards skip selected</p>
          <div className="buttons">
            <button className="back-button">Back</button>
            <button className="continue-button">Continue
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-4 h-4">
              <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
      </div>
    </div>
    )}
    </>
  )
}

export default App