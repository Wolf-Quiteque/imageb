'use client';

import { useState } from 'react';

export default function InquiryForm() {
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage('');

        const formData = new FormData(e.target);
        const data = {
            firstName: formData.get('firstname'),
            lastName: formData.get('lastname'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            inquiryType: formData.get('inquiry-type'),
            date: formData.get('date')
        };

        try {
            const response = await fetch('/api/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setMessage('Thank you! Your inquiry has been submitted successfully. We\'ll be in touch soon!');
                e.target.reset();
            } else {
                setMessage('Sorry, there was an error submitting your inquiry. Please try again.');
            }
        } catch (error) {
            setMessage('Sorry, there was an error submitting your inquiry. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {message && (
                <div style={{
                    padding: '15px',
                    marginBottom: '20px',
                    borderRadius: '6px',
                    backgroundColor: message.includes('Thank you') ? '#4CAF50' : '#f44336',
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: '500'
                }}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label style={{ color: '#ffffff', marginBottom: '8px' }}>First Name</label>
                            <input type="text" className="form-control style-border" name="firstname" id="firstname"
                                placeholder="" required />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label style={{ color: '#ffffff', marginBottom: '8px' }}>Last Name</label>
                            <input type="text" className="form-control style-border" name="lastname" id="lastname"
                                placeholder="" required />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label style={{ color: '#ffffff', marginBottom: '8px' }}>Email</label>
                            <input type="email" className="form-control style-border" name="email" id="inquiry-email"
                                placeholder="" required />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label style={{ color: '#ffffff', marginBottom: '8px' }}>Phone</label>
                            <input type="tel" className="form-control style-border" name="phone" id="phone"
                                placeholder="" required />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label style={{ color: '#ffffff', marginBottom: '8px' }}>What are you inquiring about?</label>
                            <select className="form-control style-border" name="inquiry-type" id="inquiry-type" required>
                                <option value="">Select an option</option>
                                <option value="wedding">Wedding Photography</option>
                                <option value="engagement">Engagement Session</option>
                                <option value="couples">Couples Photography</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label style={{ color: '#ffffff', marginBottom: '8px' }}>Date</label>
                            <input type="date" className="form-control style-border" name="date" id="inquiry-date" required />
                        </div>
                    </div>
                </div>

                <div className="form-btn col-12 text-center">
                    <button type="submit" className="btn" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </>
    );
}
