// src/components/admin/WeddingDetails.tsx
import React from 'react';
import '../../../styles/admin/WeddingDetails.css';

const WeddingDetails: React.FC = () => {

    return (
        <section className="mika-wedding-details">
            <div className="mika-details-content">
                <div className="mika-wedding-date">
                    22.05.2026
                </div>
                <div className="mika-wedding-venue">
                    Põhjala Resort
                </div>
            </div>
        </section>
    );
};

export default WeddingDetails;