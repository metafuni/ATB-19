import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldVirus } from '@fortawesome/free-solid-svg-icons';

function Loading() {
    return (
        <div className="loading" 
            style={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                background: ' rgba(241, 246, 249, 0.6)',
                zIndex: '10',
                position: 'fixed',
                top: '0',
                left: '0', 
                width: '100vw',
                height: '100vh'
            }}>
            <h3>
                <FontAwesomeIcon icon={faShieldVirus} size="xs" style={{ marginRight: '.2rem', color: '#0f3dd3cb' }} />ATB-19
            </h3>
        </div>
    )
}

export default Loading;
