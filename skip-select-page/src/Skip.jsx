import React from 'react';
import './Skip.css';

function Skip({ skip, isSelected, onSelect, isLast }) {
  const {
    name,
    size,
    hire_period_days,
    price_before_vat,
    vat,
    allowed_on_road,  
  } = skip;

  const priceWithVAT = price_before_vat && vat ? (price_before_vat + (price_before_vat * vat / 100)) : null;
  const fallbackPrice = skip.transport_cost && skip.per_tonne_cost ? skip.transport_cost + skip.per_tonne_cost : null;

  const isPrivateProperty = allowed_on_road === false;

  return (
    <div className={`skip-container ${isSelected ? 'selected' : ''} ${isLast ? 'last-skip' : ''}`}>
      <div className="image-wrapper">
        <img
          src="https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=800"
          alt={name}
          className="skip-image"
        />

        <span className="skip-size-badge">{`${size} Yards` || 'N/A'}</span>

        {isPrivateProperty && (
          <div className="private-property-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-alert-triangle w-4 h-4 text-yellow-500 shrink-0">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
            <span>Private Property Only</span>
          </div>
        )}
      </div>

      <div className="skip-details">
        <h3 className="skip-title">{`${size} Yards Skip` || 'N/A'}</h3>
        <p className="skip-hire">{hire_period_days || 'N/A'} day hire period</p>

        {priceWithVAT !== null ? (
          <p className="skip-price">
            Price (VAT incl.): <span className="price-number"> £{priceWithVAT.toFixed(2)}</span>
          </p>
        ) : (
          <p className="skip-price">
            Price (per tonne & transport): <span className="price-number"> £{fallbackPrice.toFixed(2)}</span>
          </p>
        )}

        <button 
          className={`select-skip-button ${isSelected ? 'selected' : ''}`} 
          onClick={onSelect}>
            {isSelected ? 'Selected' : 'Select This Skip'}
            {!isSelected && (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-right w-4 h-4">
                <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
              </svg>
            )}
        </button>
      </div>
    </div>
  );
}

export default Skip;
